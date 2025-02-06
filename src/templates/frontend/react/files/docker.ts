export const getDockerFiles = () => [
  {
    path: 'Dockerfile',
    content: `# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
  },
  {
    path: 'nginx.conf',
    content: `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}`
  },
  {
    path: 'docker-compose.yml',
    content: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    volumes:
      - ./src:/app/src
    environment:
      - NODE_ENV=production`
  }
];