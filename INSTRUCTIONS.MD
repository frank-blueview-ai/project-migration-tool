docker build -t project-migrate-backend .
docker run -p 8000:8000 -v /mnt/f/xCode/:/mnt/f/xCode/ -v /home/frank:/home/frank project-migrate-backend
gcloud builds submit --tag gcr.io/PROJECT/project-migrate-backend
gcloud run deploy project-migrate-backend ...


docker build -t project-migrate-frontend .
docker run -p 8080:80 project-migrate-frontend
gcloud builds submit --tag gcr.io/PROJECT/project-migrate-frontend
gcloud run deploy project-migrate-frontend ...

