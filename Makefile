PYTHON ?= python3

.PHONY: backend-venv backend-install backend-run backend-test frontend-install frontend-run all-dev

backend-venv:
    cd backend && $(PYTHON) -m venv .venv

backend-install: backend-venv
    cd backend && . .venv/bin/activate && pip install -e .

backend-run:
    cd backend && . .venv/bin/activate && uvicorn project_migrate.api.app:app --reload --port 8000

backend-test:
    cd backend && . .venv/bin/activate && pytest

frontend-install:
    cd frontend && npm install

frontend-run:
    cd frontend && npm run dev

all-dev: backend-install frontend-install
