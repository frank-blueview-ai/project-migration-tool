k8s_yaml([
  "deploy/k8s/backend-deployment.yaml",
  "deploy/k8s/backend-service.yaml",
  "deploy/k8s/frontend-deployment.yaml",
  "deploy/k8s/frontend-service.yaml",
  "deploy/k8s/ingress.yaml",
])

docker_build(
  'project-migrate-backend',
  'backend',
  dockerfile='backend/Dockerfile',
)

docker_build(
  'project-migrate-frontend',
  'frontend',
  dockerfile='frontend/Dockerfile',
)
