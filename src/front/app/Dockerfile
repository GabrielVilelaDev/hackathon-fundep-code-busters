# Stage 1: Build the design system
FROM node:20-alpine AS design-system-builder

WORKDIR /design-system

# Install pnpm globally (disable SSL verification for corporate proxies)
RUN npm config set strict-ssl false && npm install -g pnpm@9.1.0

# Copy design system files
COPY design-system/package.json design-system/pnpm-lock.yaml ./
RUN pnpm config set strict-ssl false && pnpm install --frozen-lockfile

COPY design-system/ ./
RUN pnpm run build

# Stage 2: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally (disable SSL verification for corporate proxies)
RUN npm config set strict-ssl false && npm install -g pnpm@9.1.0

# Copy package files
COPY app/package.json app/pnpm-lock.yaml ./

# Copy built design system from previous stage
COPY --from=design-system-builder /design-system /design-system

# Install dependencies
RUN pnpm config set strict-ssl false && pnpm install --frozen-lockfile

# Copy application source
COPY app/ ./

# Build the application using build config that ignores unused variables
RUN pnpm exec tsc --project tsconfig.build.json && pnpm exec vite build

# Stage 3: Production
FROM nginx:alpine

# Copy custom nginx config
COPY app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
