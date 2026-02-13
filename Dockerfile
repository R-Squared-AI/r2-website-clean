# Stage 1: Build the Next.js static export
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build static export to /out
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static export from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Copy Cloudflare-style _headers for reference (nginx handles headers via config)
COPY --from=builder /app/public/_headers /usr/share/nginx/html/_headers

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
