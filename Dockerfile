FROM node:20-bullseye-slim

WORKDIR /app

# Install minimal tools for bun installation and runtime
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl ca-certificates ca-certificates gnupg dirmngr build-essential libssl-dev libgcc-s1 \
	&& rm -rf /var/lib/apt/lists/*

# Copy package files and prisma first for better caching
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Copy rest of the source
COPY . .

# Install Bun via official install script and symlink binaries to /usr/local/bin
RUN curl -fsSL https://bun.sh/install | bash -s -- --no-modify-path \
	&& ln -s /root/.bun/bin/bun /usr/local/bin/bun \
	&& ln -s /root/.bun/bin/bunx /usr/local/bin/bunx

# Install dependencies using Bun
RUN bun install --no-save

RUN chmod +x /app/docker-entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
