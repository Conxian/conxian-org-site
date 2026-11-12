# ==============================================================================
# CONXIAN PROTOCOL SURFACE (conxian.org) MULTI-STAGE DOCKERFILE
# ==============================================================================

# Stage 1: Build Environment
FROM node:26-alpine AS builder

WORKDIR /app

# Node 26 images no longer guarantee Corepack is bundled. Install the exact
# repository-pinned pnpm version with npm, then fail if the resolved version
# drifts from package.json's packageManager contract.
RUN npm install --global --no-audit --no-fund pnpm@10.28.0 \
    && test "$(pnpm --version)" = "10.28.0"

# Copy dependency definitions
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies deterministically
RUN pnpm install --frozen-lockfile

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
