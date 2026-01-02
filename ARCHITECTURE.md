
The CLI is the primary interface for local migrations.

---

# 4. FastAPI Backend

Endpoints:

- `POST /migrate`
- `POST /rollback`

Responsibilities:

- Orchestration  
- Logging  
- Manifest storage  
- Optional job queue  

Does **not** access local filesystem unless volumes are mounted.

---

# 5. React Frontend

Features:

- Migration form  
- Dry-run preview  
- Manifest viewer  
- Rollback UI  
- Logs viewer  

Served by NGINX.

---

# 6. Docker Architecture

Containers:

- Backend (FastAPI)
- Frontend (React + NGINX)
- Optional combined pod

---

# 7. Kubernetes Deployment

Objects:

- Deployments  
- Services  
- Ingress  
- ConfigMaps  
- Secrets  

Optional:

- Helm chart  
- Autoscaling  
- Logging stack  
- Metrics  

---

# 8. Storage Strategy

Options:

1. Local CLI (recommended)  
2. Docker volume mounts  
3. Shared storage (NFS/EFS/etc.)  
4. File upload (not ideal for large projects)  

---

# 9. CI/CD

GitHub Actions:

- Lint  
- Test  
- Build Docker images  
- Push to registry  
- Deploy to Kubernetes  

---

# 10. Future Extensions

- Distributed migration  
- Remote manifests  
- RBAC  
- Notifications  
- Plugin system  
