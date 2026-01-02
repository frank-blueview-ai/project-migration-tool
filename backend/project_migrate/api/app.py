# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from contextlib import asynccontextmanager
from fastapi.responses import PlainTextResponse
from fastapi import FastAPI, BackgroundTasks, HTTPException
from .schemas import (
    MigrationRequest,
    MigrationResult,
    RollbackRequest,
    RollbackResult,
    JobInfo,
    JobDetail,
)
from ..engine import migrator, rollback as rollback_engine
from . import jobs
from .logging_stream import JobLogHandler
from ..db import create_db_and_tables, get_session, engine
from pathlib import Path
import logging
import time
import threading
from typing import Dict

# Global dictionary to store cancel events for jobs
job_cancellation_events: Dict[str, threading.Event] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    jobs.job_manager = jobs.JobManager(engine)
    yield

app = FastAPI(title="Project Migrate API", version="0.1.0", lifespan=lifespan)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health")
def health():
    return {"status": "ok"}


def validate_paths(source: str | None, destination: str | None):
    if source is not None:
        if not Path(source).is_dir():
            raise HTTPException(status_code=400, detail=f"Source not found: {source}")
    if destination is not None:
        dest_parent = Path(destination).parent
        if not dest_parent.exists():
            raise HTTPException(
                status_code=400, detail=f"Destination parent does not exist: {dest_parent}"
            )


def _run_migration_job(job_id: str, request: MigrationRequest, cancel_event: threading.Event):
    job = jobs.job_manager.get(job_id)
    if not job:
        return
    job.status = "running"
    jobs.job_manager.update(job)

    logger = logging.getLogger("project_migrate")
    # We define a custom append wrapper that saves to DB
    def append_log(msg: str):
        # We need to re-fetch or keep updating the object
        # Ideally we batch updates or just update on every log (expensive but safe for now)
        job.logs = job.logs + [msg]
        jobs.job_manager.update(job)

    handler = JobLogHandler(append_log)
    logger.addHandler(handler)

    try:
        validate_paths(request.source, request.destination)
        
        last_update_time = [0.0]  # Use list to allow modification in closure

        def update_progress(total: int, processed: int):
            current_time = time.time()
            # Update only if 1 second passed or completed
            if current_time - last_update_time[0] >= 1.0 or processed >= total:
                # Refresh job to check for status changes (like cancellation)
                # We fetch a fresh copy so we don't overwrite 'cancelled' with 'running'
                fresh_job = jobs.job_manager.get(job_id)
                if not fresh_job or fresh_job.status == "cancelled":
                    # If cancelled, don't update progress (or at least don't revert status)
                    return
                
                fresh_job.total_files = total
                fresh_job.files_processed = processed
                jobs.job_manager.update(fresh_job)
                last_update_time[0] = current_time
        
        result = migrator.run_migration(
            source=request.source,
            destination=request.destination,
            dry_run=request.dry_run,
            parallelism=request.parallelism,
            global_ignores=request.global_ignores or [],
            project_ignore_file=request.project_ignore_file,
            project_ignore_content=request.project_ignore_content,
            progress_callback=update_progress,
            cancel_event=cancel_event,
        )
        if cancel_event.is_set():
             # Refetch to ensure we have latest progress stats
             job = jobs.job_manager.get(job_id)
             if job:
                job.status = "cancelled"
                jobs.job_manager.update(job)
        else:
             # Refetch to ensure we have latest progress stats
             job = jobs.job_manager.get(job_id)
             if job:
                job.result = result
                job.status = "finished" if result.get("success") else "failed"
                jobs.job_manager.update(job)
    except Exception as exc:  # noqa
        # Refetch to ensure we have latest state
        job = jobs.job_manager.get(job_id)
        if job:
            if cancel_event.is_set():
                 job.status = "cancelled"
                 append_log("Job cancelled by user")
            else:
                 append_log(f"Error: {exc}")
                 job.status = "failed"
            jobs.job_manager.update(job)
    finally:
        logger.removeHandler(handler)


@app.post("/api/v1/jobs/{job_id}/cancel")
def cancel_job_endpoint(job_id: str):
    if job_id in job_cancellation_events:
        job_cancellation_events[job_id].set()
        
        # Also update status immediately
        job = jobs.job_manager.get(job_id)
        if job and job.status == "running":
            job.status = "cancelled"
            jobs.job_manager.update(job)
            
        return {"status": "ok", "message": "Cancellation requested"}
    return {"status": "error", "message": "Job not running or not found"}


@app.post("/api/v1/migrate", response_model=JobInfo)
def enqueue_migration(request: MigrationRequest, background: BackgroundTasks):
    job = jobs.job_manager.create_job("migration", payload=request.model_dump())
    
    # Create cancellation event
    cancel_event = threading.Event()
    job_cancellation_events[job.id] = cancel_event
    
    def _run_wrapper(jid, req):
        try:
            _run_migration_job(jid, req, cancel_event)
        finally:
            # Cleanup event
            job_cancellation_events.pop(jid, None)
            
    background.add_task(_run_wrapper, job.id, request)
    return JobInfo(**job.__dict__)


def _run_rollback_job(job_id: str, request: RollbackRequest):
    job = jobs.job_manager.get(job_id)
    if not job:
        return
    job.status = "running"
    jobs.job_manager.update(job)

    logger = logging.getLogger("project_migrate")
    def append_log(msg: str):
        job.logs = job.logs + [msg]
        jobs.job_manager.update(job)

    handler = JobLogHandler(append_log)
    logger.addHandler(handler)

    try:
        result = rollback_engine.run_rollback(
            target=request.target,
            manifest_path=request.manifest_path,
            dry_run=request.dry_run,
        )
        job.result = result
        job.status = "finished"
        jobs.job_manager.update(job)
    except Exception as exc:  # noqa
        append_log(f"Error: {exc}")
        job.status = "failed"
        jobs.job_manager.update(job)
    finally:
        logger.removeHandler(handler)


@app.post("/api/v1/rollback", response_model=JobInfo)
def enqueue_rollback(request: RollbackRequest, background: BackgroundTasks):
    job = jobs.job_manager.create_job("rollback", payload=request.model_dump())
    background.add_task(_run_rollback_job, job.id, request)
    return JobInfo(**job.__dict__)


@app.get("/api/v1/jobs", response_model=list[JobInfo])
def list_jobs():
    return [JobInfo(**j.__dict__) for j in jobs.job_manager.all()]


@app.get("/api/v1/jobs/{job_id}", response_model=JobDetail)
def job_detail(job_id: str):
    job = jobs.job_manager.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobDetail(**job.__dict__)


@app.delete("/api/v1/jobs/{job_id}")
def delete_job(job_id: str):
    success = jobs.job_manager.delete(job_id)
    if not success:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"status": "ok"}


@app.get("/api/v1/jobs/{job_id}/logs", response_model=list[str])
def job_logs(job_id: str):
    job = jobs.job_manager.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job.logs
@app.get("/metrics", response_class=PlainTextResponse)
def metrics():
    # Simple placeholder; later integrate Prometheus client.
    return "project_migrate_up 1\n"