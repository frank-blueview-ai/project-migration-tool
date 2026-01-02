# Project Migrate - Copilot Instructions

You are assisting with "Project Migrate", a modular system for safe filesystem migrations.
The project is currently in a skeleton state. Your goal is to help implement the core functionality following the defined architecture.

## 1. Architecture & Boundaries
- **Multi-Component System**:
  - **CLI**: Primary interface for local migrations.
  - **Backend**: FastAPI service for orchestration, logging, and manifest storage.
  - **Frontend**: React dashboard for visualization and control.
- **Data Flow**:
  - The CLI and Backend share the core migration logic (likely a shared library or module).
  - The Frontend communicates with the Backend via REST API.
  - **Critical**: The Backend does *not* access the local filesystem directly unless volumes are mounted.

## 2. Tech Stack & Standards
- **Python (Backend/CLI)**:
  - Version: **3.10+**
  - Framework: **FastAPI**
  - Style: Use **Type Hints** everywhere. Use **Pydantic** for data validation and schemas.
  - Testing: Use `pytest`.
- **JavaScript/TypeScript (Frontend)**:
  - Runtime: **Node.js 18+**
  - Framework: **React**
  - Style: Functional components with Hooks.
- **Infrastructure**:
  - **Docker**: Multi-stage builds for production.
  - **Kubernetes/Helm**: Deployment manifests in `deploy/`.

## 3. Development Workflow
- **Placeholder Replacement**: The project contains `placeholder.txt` and `placeholder.yaml` files. When implementing features, replace these with actual code/config.
- **Documentation First**: Refer to `ARCHITECTURE.md` for design intent before implementing complex features.
- **Testing**:
  - Write unit tests for migration logic (dry-run, copy, rollback).
  - Ensure the CLI and Backend can share logic without tight coupling to the HTTP layer.

## 4. Key Conventions
- **Manifests**: Migrations must generate a manifest file (JSON/YAML) containing checksums for rollback support.
- **Idempotency**: Migration operations should be idempotent where possible.
- **Safety**: Always implement a "dry-run" mode for migration commands.

## 5. File Structure
- `backend/`: FastAPI application and core migration logic.
- `frontend/`: React application.
- `deploy/`: Helm charts and K8s manifests.
- `ARCHITECTURE.md`: The source of truth for system design.
