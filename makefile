install:
    pip install -e backend
    cd frontend && npm install

run-backend:
    cd backend && uvicorn project_migrate.api.app:app --reload --port 8000

run-frontend:
    cd frontend && npm run dev

test:
    cd backend && pytest
