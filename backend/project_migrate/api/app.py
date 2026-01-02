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
    
    # Buffering state
    log_buffer = []
    last_flush_time = [0.0]
    
    def flush_logs(force=False):
        current_time = time.time()
        # Flush if we have logs AND (enough time passed OR buffer is big OR forcing)
        if log_buffer and (
            force or 
            (current_time - last_flush_time[0] >= 1.0) or 
            (len(log_buffer) >= 50)
        ):
            # Re-fetch job to update safely
            job_to_update = jobs.job_manager.get(job_id)
            if job_to_update:
                job_to_update.logs = job_to_update.logs + list(log_buffer)
                jobs.job_manager.update(job_to_update)
                log_buffer.clear()
                last_flush_time[0] = current_time

    def append_log(msg: str):
        log_buffer.append(msg)
        flush_logs(force=False)

    handler = JobLogHandler(append_log)
    logger.addHandler(handler)

    try:
        validate_paths(request.source, request.destination)
        
        last_progress_update_time = [0.0]

        def update_progress(total: int, processed: int):
            current_time = time.time()
            # Update only if 1 second passed or completed
            if current_time - last_progress_update_time[0] >= 1.0 or processed >= total:
                # Also flush logs when we update progress
                flush_logs(force=True)
                
                # Refresh job to check for status changes (like cancellation)
                fresh_job = jobs.job_manager.get(job_id)
                if not fresh_job or fresh_job.status == "cancelled":
                    return
                
                fresh_job.total_files = total
                fresh_job.files_processed = processed
                jobs.job_manager.update(fresh_job)
                last_progress_update_time[0] = current_time
        
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
        
        # Flush any remaining logs before final status update
        flush_logs(force=True)
        
        if cancel_event.is_set():
             job = jobs.job_manager.get(job_id)
             if job:
                job.status = "cancelled"
                jobs.job_manager.update(job)
        else:
             job = jobs.job_manager.get(job_id)
             if job:
                job.result = result
                job.status = "finished" if result.get("success") else "failed"
                jobs.job_manager.update(job)
    except Exception as exc:  # noqa
        # Ensure unexpected errors are logged
        append_log(f"Error: {exc}")
        flush_logs(force=True)
        
        job = jobs.job_manager.get(job_id)
        if job:
            if cancel_event.is_set():
                 job.status = "cancelled"
                 job.logs.append("Job cancelled by user") # distinct append for final message
            else:
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
    
    log_buffer = []
    last_flush_time = [0.0]

    def flush_logs(force=False):
        current_time = time.time()
        if log_buffer and (
            force or 
            (current_time - last_flush_time[0] >= 1.0) or 
            (len(log_buffer) >= 50)
        ):
            job_to_update = jobs.job_manager.get(job_id)
            if job_to_update:
                job_to_update.logs = job_to_update.logs + list(log_buffer)
                jobs.job_manager.update(job_to_update)
                log_buffer.clear()
                last_flush_time[0] = current_time

    def append_log(msg: str):
        log_buffer.append(msg)
        flush_logs(force=False)

    handler = JobLogHandler(append_log)
    logger.addHandler(handler)

    try:
        result = rollback_engine.run_rollback(
            target=request.target,
            manifest_path=request.manifest_path,
            dry_run=request.dry_run,
        )
        flush_logs(force=True)
        
        job = jobs.job_manager.get(job_id)
        if job:
            job.result = result
            job.status = "finished"
            jobs.job_manager.update(job)
    except Exception as exc:  # noqa
        append_log(f"Error: {exc}")
        flush_logs(force=True)
        
        job = jobs.job_manager.get(job_id)
        if job:
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