# Use an official Node.js runtime as a parent image
FROM node:22-bookworm-slim AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use a lightweight web server to serve the static files
FROM nginx:1.27.1-alpine-slim

# Copy the built app from the build stage
COPY --from=build /app/dist/todo-app /usr/share/nginx/html

# Copy the custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
