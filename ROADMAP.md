# Project Migrate — Roadmap

This document outlines the full roadmap for the `project-migrate` ecosystem, including
the CLI tool, migration engine, FastAPI backend, React frontend, Dockerization, and
Kubernetes deployment. Each phase can be implemented independently.

---

# 1. Core Migration Engine (Python)

## 1.1 Features
- File discovery and filtering
- Global ignore patterns
- Per-project `.path_migrator_ignore`
- Dry-run mode
- Real migration mode
- Parallel copy support
- Manifest generation (planned + checksummed)
- Rollback support using manifest
- Structured logging

## 1.2 Modules
- `engine/migrator.py`
- `engine/manifest.py`
- `engine/rollback.py`
- `engine/parallel.py`
- `engine/ignores.py`
- `logging_config.py`
- `__version__.py`

---

# 2. CLI Tool

## 2.1 Subcommands
- `run`
- `dry-run`
- `rollback`
- `manifest`
- `version`

## 2.2 Framework
- Built with `typer`

---

# 3. FastAPI Backend

## 3.1 Endpoints
- `POST /migrate`
- `POST /rollback`

## 3.2 Responsibilities
- Orchestration
- Logging
- Manifest storage
- Optional job queue

---

# 4. React Frontend

## 4.1 Features
- Migration form
- Dry-run preview
- Manifest viewer
- Rollback UI
- Logs viewer

---

# 5. Dockerization

## 5.1 Backend
- Python base image
- Uvicorn server

## 5.2 Frontend
- React build
- NGINX serving static files
- Reverse proxy to backend

---

# 6. Kubernetes Deployment

## 6.1 Objects
- Deployments
- Services
- Ingress
- ConfigMaps
- Secrets

## 6.2 Enhancements
- Autoscaling
- TLS
- Logging stack
- Metrics

---

# 7. Storage Strategy

1. Local CLI (recommended)  
2. Docker volume mounts  
3. Shared storage  
4. File upload  

---

# 8. CI/CD

- GitHub Actions  
- Linting  
- Testing  
- Docker builds  
- Kubernetes deploy  

---

# 9. Future Enhancements

- Distributed migration  
- RBAC  
- Notifications  
- Plugin system  
