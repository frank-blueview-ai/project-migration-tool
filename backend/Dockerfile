FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml /app/
RUN pip install --upgrade pip && pip install .

COPY project_migrate /app/project_migrate

EXPOSE 8000

CMD ["uvicorn", "project_migrate.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
