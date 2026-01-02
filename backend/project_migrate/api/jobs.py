# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

import uuid
import time
from typing import Dict, Optional, Any, List
from sqlmodel import SQLModel, Field, Session, select, JSON
from .schemas import JobInfo

class Job(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    type: str
    status: str = Field(default="queued")  # queued | running | finished | failed
    created_at: float = Field(default_factory=time.time)
    updated_at: float = Field(default_factory=time.time)
    payload: Dict[str, Any] = Field(default_factory=dict, sa_type=JSON)
    result: Optional[Dict[str, Any]] = Field(default=None, sa_type=JSON)
    logs: List[str] = Field(default_factory=list, sa_type=JSON)
    total_files: int = Field(default=0)
    files_processed: int = Field(default=0)

    class Config:
        arbitrary_types_allowed = True


class JobManager:
    def __init__(self, engine) -> None:
        self.engine = engine

    def create_job(self, type_: str, payload: Dict[str, Any]) -> Job:
        job = Job(type=type_, payload=payload)
        with Session(self.engine) as session:
            session.add(job)
            session.commit()
            session.refresh(job)
            return job

    def get(self, job_id: str) -> Optional[Job]:
        with Session(self.engine) as session:
            return session.get(Job, job_id)

    def all(self) -> List[Job]:
        with Session(self.engine) as session:
            statement = select(Job).order_by(Job.created_at.desc())
            return session.exec(statement).all()

    def update(self, job: Job):
        job.updated_at = time.time()
        with Session(self.engine) as session:
            # We use merge to cleanly update the object regardless of its previous session state
            session.merge(job)
            session.commit()
            # We don't refresh here to avoid re-attaching to a closed session when returning
    
    def delete(self, job_id: str) -> bool:
        with Session(self.engine) as session:
            job = session.get(Job, job_id)
            if not job:
                return False
            session.delete(job)
            session.commit()
            return True

# Initialize later in app startup
job_manager: Optional[JobManager] = None
