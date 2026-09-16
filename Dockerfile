# ==============================================================================
# CONXIAN PROTOCOL SURFACE (conxian.org) MULTI-STAGE DOCKERFILE
# ==============================================================================

# Stage 1: Build Environment
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency definitions
COPY package.json pnpm-lock.yaml* ./

# Install dependencies deterministically
RUN pnpm install --frozen-lockfile || pnpm install

# Copy application source code
COPY . .

# Build Astro static production assets
RUN pnpm build

# Stage 2: Production Unprivileged Web Server
FROM nginx:1.27-alpine AS runner

# Copy custom NGINX firewall configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy compiled static site from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
