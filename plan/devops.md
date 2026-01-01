# DevOps & Infrastructure Plan

This document outlines the DevOps strategy for the Yazd Health Transparency Platform.

## 1. Containerization (Docker)

- **Task:** Create Dockerfiles for consistent environments.
- **Steps:**
    1.  Create `Dockerfile` for Next.js app (Multi-stage build: deps, builder, runner).
    2.  Create `docker-compose.yml` for local development (App + Postgres).
- **Checks:**
    - `docker-compose up` starts the app and DB.
    - App connects to DB within the network.
- **Acceptance Criteria:**
    - Image size optimized (<200MB ideally).
- **Plan to Docs:**
    - Add Docker run instructions to README.
- **QC:**
    - Verify `node_modules` are not bloated in final image.
- **Test Scenario:**
    - Build image -> Run container -> Curl localhost:3000 returns 200.

## 2. CI/CD Pipeline (GitHub Actions)

- **Task:** Automate testing and linting.
- **Steps:**
    1.  Create `.github/workflows/ci.yml`.
    2.  Step: Checkout code.
    3.  Step: Install dependencies.
    4.  Step: Run Linter (`npm run lint`).
    5.  Step: Run Type Check (`tsc --noEmit`).
    6.  Step: Run Tests (`npm test`).
    7.  Step: Build (`npm run build`).
- **Checks:**
    - Pipeline fails on lint error.
    - Pipeline fails on test failure.
- **Acceptance Criteria:**
    - All PRs must pass CI before merge.
- **Plan to Docs:**
    - Add badge to README.
- **QC:**
    - Review workflow execution time.
- **Test Scenario:**
    - Push broken code -> CI fails.

## 3. Database Management

- **Task:** Manage schema changes and backups.
- **Steps:**
    1.  Use `prisma migrate` for schema changes.
    2.  Setup backup script for Postgres (pg_dump) in production.
- **Checks:**
    - Migrations apply automatically in deployment.
- **Acceptance Criteria:**
    - Zero downtime migrations (where possible).
- **Plan to Docs:**
    - Document migration rollback procedure.
- **QC:**
    - Test migration on copy of production data.
- **Test Scenario:**
    - Apply migration -> Check DB structure.

## 4. Deployment Strategy (Vercel / VPS)

- **Task:** Plan for production deployment.
- **Steps:**
    1.  **Option A (Vercel):** Connect GitHub repo. Configure Env Vars. (Easiest for MVP).
    2.  **Option B (VPS/Docker):** Setup Nginx reverse proxy, Certbot (SSL), and run Docker Compose.
- **Checks:**
    - Site is accessible via HTTPS.
- **Acceptance Criteria:**
    - Fast TTFB (Time to First Byte).
- **Plan to Docs:**
    - Save deployment config.
- **QC:**
    - SSL Certificate valid.
- **Test Scenario:**
    - Deploy -> Visit URL.
