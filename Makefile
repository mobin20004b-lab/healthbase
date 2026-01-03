# Makefile for healthbase
# Usage: make <target>

APP_DIR ?= /opt/healthbase
ECOSYSTEM ?= $(APP_DIR)/ecosystem.config.cjs
ENV_FILE ?= $(APP_DIR)/.env
NPM ?= npm
PRISMA_SCHEMA ?= prisma/schema.prisma

.PHONY: help install build dev start generate migrate-deploy migrate-push seed pm2-start pm2-reload pm2-stop logs lint test

help:
	@echo "Makefile targets:"
	@echo "  install         Install dependencies (npm ci)"
	@echo "  build           Run production build (npm run build)"
	@echo "  dev             Run dev server (npm run dev)"
	@echo "  start           Run production server (npm run start)"
	@echo "  generate        Run Prisma client generation"
	@echo "  migrate-deploy  Deploy Prisma migrations (recommended for prod)"
	@echo "  migrate-push    Push schema to DB (use for dev/emergency)"
	@echo "  seed            Run DB seed script (ts-node)"
	@echo "  pm2-start       Start app with PM2 using ecosystem file"
	@echo "  pm2-reload      Reload app with PM2 (zero downtime)"
	@echo "  pm2-stop        Stop/delete PM2 process 'topmedica'"
	@echo "  logs            Tail PM2 logs for 'topmedica'"
	@echo "  lint            Run linter"
	@echo "  test            Run tests"

install:
	$(NPM) ci

build:
	bun run build

dev:
	$(NPM) run dev

start:
	bun run start

generate:
	npx prisma generate --schema=$(PRISMA_SCHEMA)

migrate-deploy:
	npx prisma migrate deploy --schema=$(PRISMA_SCHEMA)

migrate-push:
	npx prisma db push --schema=$(PRISMA_SCHEMA)

seed:
	npx ts-node prisma/seed.ts

# Initialize DB for production: install, generate client, deploy migrations, then seed
.PHONY: init-db
init-db:
	@test -n "$(DATABASE_URL)" || (echo "DATABASE_URL not set. Export it or set in environment." && exit 1)
	$(MAKE) install
	$(MAKE) generate
	$(MAKE) migrate-deploy
	$(MAKE) seed

# Initialize DB for development: install, generate client, push schema, then seed
.PHONY: init-db-dev
init-db-dev:
	@test -n "$(DATABASE_URL)" || (echo "DATABASE_URL not set. Export it or set in environment." && exit 1)
	$(MAKE) install
	$(MAKE) generate
	$(MAKE) migrate-push
	$(MAKE) seed

# Destructive reset (development only) - runs prisma migrate reset
.PHONY: migrate-reset
migrate-reset:
	@test -n "$(DATABASE_URL)" || (echo "DATABASE_URL not set. Export it or set in environment." && exit 1)
	@echo "This will reset the database. Press Ctrl+C to cancel within 3s..."
	sleep 3
	npx prisma migrate reset --force --schema=$(PRISMA_SCHEMA)
	$(MAKE) seed

pm2-start:
	pm2 start $(ECOSYSTEM) --env production

pm2-reload:
	pm2 reload $(ECOSYSTEM) --env production

pm2-stop:
	-@pm2 stop topmedica || true
	-@pm2 delete topmedica || true

logs:
	pm2 logs topmedica --lines 200

lint:
	$(NPM) run lint

test:
	$(NPM) run test

# Docker helpers
.PHONY: docker-build docker-up docker-down docker-logs docker-restart docker-push

docker-build:
	docker build -t topmedica-app:latest .

docker-up:
	docker compose up -d --build

docker-down:
	docker compose down -v

docker-logs:
	docker compose logs -f --tail=200 app

docker-restart:
	docker compose restart app

