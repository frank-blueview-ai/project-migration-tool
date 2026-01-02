docker build -t project-migrate-backend .
docker run -p 8000:8000 project-migrate-backend
gcloud builds submit --tag gcr.io/PROJECT/project-migrate-backend
gcloud run deploy project-migrate-backend ...


docker build -t project-migrate-frontend .
docker run -p 8080:80 project-migrate-frontend
gcloud builds submit --tag gcr.io/PROJECT/project-migrate-frontend
gcloud run deploy project-migrate-frontend ...



---

# ✅ **Run the frontend locally using Docker**

### **Build the image**
```
docker build -t project-migrate-frontend .
```

### **Run the container**
```
docker run -p 8080:80 project-migrate-frontend
```

### **Test the health check**
```
curl http://localhost:8080/health
```

---

# ✅ **Deploy to Google Cloud Run**

### **1. Authenticate**
```
gcloud auth login
```

### **2. Set your project**
```
gcloud config set project YOUR_PROJECT_ID
```

### **3. Build the container with Cloud Build**
```
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/project-migrate-frontend
```

### **4. Deploy to Cloud Run**
```
gcloud run deploy project-migrate-frontend \
  --image gcr.io/YOUR_PROJECT_ID/project-migrate-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

If you want, next I can give you:

- The exact Cloud Run environment variable setup  
- How to connect your backend API URL  
- How to set up HTTPS  
- How to automate deployments with GitHub Actions





# ✅ **1 — Final Dockerfile (with Brotli) + Where to put the preload tag**

Here is the **exact final Dockerfile** you should use for your frontend:

## 📄 `frontend/Dockerfile`

```Dockerfile
# -----------------------------
# 1) Build Stage
# -----------------------------
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# -----------------------------
# 2) Production Stage (Nginx)
# -----------------------------
FROM nginx:1.25-alpine

# Install Brotli compression module
RUN apk add --no-cache brotli

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

This Dockerfile:

- Builds your React app  
- Installs Brotli inside the Nginx container  
- Serves your optimized frontend  

---

## ⭐ **Where to put the preload tag**

Open:

📄 `frontend/index.html`

Find the `<head>` section.  
Add the preload line **inside `<head>`**, above your main script.

### Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <!-- Preload your main JS bundle -->
    <link rel="preload" href="/assets/index.js" as="script" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project Migrate</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

That’s it — preload is now active.

---

# ✅ **2 — How to run the container locally**

From inside your `frontend/` folder:

### **Build the image**

```
docker build -t project-migrate-frontend .
```

### **Run the container**

```
docker run -p 8080:80 project-migrate-frontend
```

Now open:

```
http://localhost:8080
```

Your frontend is running in production mode.

---

# ✅ **3 — How to test the health check**

Your nginx.conf includes:

```nginx
location /health {
    return 200 "ok";
}
```

So once the container is running, test it:

### **Browser**
Visit:

```
http://localhost:8080/health
```

You should see:

```
ok
```

### **Terminal**

```
curl http://localhost:8080/health
```

Output:

```
ok
```

If you see that, your container is healthy.

---

# ✅ **4 — Which hosting options are free? Can you deploy to Google Cloud for free?**

Let’s break it down clearly.

---

# ⭐ **Render — YES (Free Tier Available)**  
Render offers:

- Free static site hosting  
- Free web services (limited)  
- Free PostgreSQL (limited)

You can deploy your frontend **for free** on Render.

---

# ⭐ **Fly.io — YES (Free Tier Available)**  
Fly.io gives:

- Free VMs (shared CPU)  
- Free bandwidth  
- Free persistent storage (small)

You can deploy your Dockerized frontend **for free**.

---

# ⭐ **DigitalOcean — NO (No free tier)**  
DigitalOcean requires:

- Minimum $5/month droplet  
- No free credits unless you use a promo

So DO is **not free**.

---

# ⭐ **AWS — NO (Not truly free)**  
AWS has a “free tier”, but:

- It expires after 12 months  
- It requires a credit card  
- It’s easy to accidentally incur charges  
- It’s not suitable for hobby deployments

So AWS is **not free** in practice.

---

# ⭐ **Google Cloud — YES (Always‑Free Tier)**  
Google Cloud has an **always‑free** tier:

- 1 f1‑micro VM (US regions only)  
- 5GB storage  
- 1GB egress per month  

You *can* deploy your frontend to Google Cloud for free using:

- Cloud Run (free tier)  
- Cloud Storage (free tier)  
- Cloud Compute f1‑micro (free tier)

### Best option on Google Cloud:
**Cloud Run**  
- Deploys Docker containers  
- Scales to zero  
- Free for small workloads  
- Perfect for your Nginx container

So yes — **you can deploy your frontend to Google Cloud for free**.

---

# 🎯 **Summary**

| Platform | Free? | Notes |
|---------|-------|-------|
| **Render** | ✅ Yes | Best free option for static sites |
| **Fly.io** | ✅ Yes | Great for Docker deployments |
| **Google Cloud** | ✅ Yes | Cloud Run free tier works perfectly |
| **AWS** | ❌ No | Free tier expires + hidden costs |
| **DigitalOcean** | ❌ No | No free tier |

---

If you want, I can now generate:

- A **Google Cloud Run deployment guide**  
- A **Render deployment guide**  
- A **Fly.io deployment guide**  
- A **docker‑compose.yml** for local multi‑service setup  
- A **CI/CD pipeline** (GitHub Actions)

Just tell me which one you want next.