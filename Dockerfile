FROM ghcr.io/oven-sh/bun:latest

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Copy source
COPY . .

# Install dependencies (including dev deps needed for prisma/ts-node)
RUN bun install --no-save

RUN chmod +x /app/docker-entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
