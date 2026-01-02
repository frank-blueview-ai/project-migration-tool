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
