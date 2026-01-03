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
