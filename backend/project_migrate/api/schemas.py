# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

from pydantic import BaseModel
from typing import Optional, List, Dict, Any




class MigrationRequest(BaseModel):
    source: str
    destination: str
    dry_run: bool = True
    parallelism: int = 4
    global_ignores: Optional[List[str]] = None
    project_ignore_file: Optional[str] = None
    project_ignore_content: Optional[str] = None


class MigrationResult(BaseModel):
    success: bool
    message: str
    manifest_path: Optional[str] = None
    details: Optional[dict] = None


class RollbackRequest(BaseModel):
    target: str
    manifest_path: str
    dry_run: bool = True



class RollbackResult(BaseModel):
    success: bool
    message: str
    details: Optional[dict] = None



class JobInfo(BaseModel):
  id: str
  type: str
  status: str
  created_at: float
  updated_at: float
  total_files: int = 0
  files_processed: int = 0


class JobDetail(JobInfo):
  payload: Dict[str, Any]
  result: Optional[Dict[str, Any]] = None
  logs: List[str] = []
