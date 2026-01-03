FROM node:20-bullseye-slim

WORKDIR /app

# Install minimal tools for bun installation and runtime
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl ca-certificates gnupg dirmngr build-essential libssl-dev libgcc-s1 unzip \
	&& rm -rf /var/lib/apt/lists/*

# Copy package files and prisma first for better caching
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Copy rest of the source
COPY . .

# Install Bun directly to /usr/local/bin
RUN set -eux; \
	BUN_ZIP="/tmp/bun.zip"; \
	BUN_URL="https://github.com/oven-sh/bun/releases/latest/download/bun-linux-x64.zip"; \
	echo "Downloading Bun from $BUN_URL"; \
	curl -fsSL "$BUN_URL" -o "$BUN_ZIP"; \
	unzip "$BUN_ZIP" -d /tmp/bun-extract; \
	mv /tmp/bun-extract/bun /usr/local/bin/bun; \
	mv /tmp/bun-extract/bunx /usr/local/bin/bunx 2>/dev/null || true; \
	rm -rf "$BUN_ZIP" /tmp/bun-extract; \
	chmod +x /usr/local/bin/bun; \
	bun --version

# Install dependencies using Bun
RUN bun install --no-save

RUN chmod +x /app/docker-entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
