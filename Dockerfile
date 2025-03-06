# Stage 1: Build the Hexo site
FROM node:14-alpine AS builder
WORKDIR /app

# Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the repository files
COPY . .

# Build the Hexo site (this generates static files in the "public" folder)
RUN npx hexo generate

# Stage 2: Serve the static site with Nginx
FROM nginx:alpine
# Copy the generated static files from the builder stage to Nginx's web root
COPY --from=builder /app/public /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
