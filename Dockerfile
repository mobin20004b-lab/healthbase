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

# Install Bun using official installer
RUN curl -fsSL https://bun.com/install | bash && \
	ln -sf /root/.bun/bin/bun /usr/local/bin/bun && \
	ln -sf /root/.bun/bin/bunx /usr/local/bin/bunx && \
	bun --version

# Install dependencies using Bun
RUN bun install --no-save

RUN chmod +x /app/docker-entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
