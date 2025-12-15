# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for Vite
ARG VITE_GOOGLE_API_KEY
ARG VITE_SPREADSHEET_ID
ARG VITE_SHEET_NAME
ARG VITE_SHEET_RANGE

# Set as environment variables for build
ENV VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY
ENV VITE_SPREADSHEET_ID=$VITE_SPREADSHEET_ID
ENV VITE_SHEET_NAME=$VITE_SHEET_NAME
ENV VITE_SHEET_RANGE=$VITE_SHEET_RANGE

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration FIRST
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add health check for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
