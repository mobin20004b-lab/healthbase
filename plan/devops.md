# DevOps & Infrastructure Plan

This document outlines the DevOps and Infrastructure strategy for the Yazd Health Transparency Platform.

## Task 1: Containerization

### Steps
1.  Create `Dockerfile` for the Next.js application (multi-stage build).
2.  Create `docker-compose.yml` for local development (App + Postgres).
3.  Optimize image size (use `node:alpine` or similar).

### Checks
- [ ] Docker build succeeds.
- [ ] Container starts and runs the app.
- [ ] `docker-compose up` spins up the full stack.

### AC
-   Image size < 200MB (optimized).
-   Build time < 5 minutes.

### Plan to Docs
-   Add "Running with Docker" to README.

### QC
-   Scan image for vulnerabilities (trivy).

### Test Scenario
-   **Scenario 1:** Run `docker-compose up`. Access `localhost:3000`. Stop containers. Data in DB should persist (volumes).

---

## Task 2: CI/CD Pipeline (GitHub Actions)

### Steps
1.  Create `.github/workflows/ci.yml`.
2.  Add steps for: Checkout, Install Deps, Lint, Type Check, Test, Build.
3.  Add step for: Build Docker Image and Push to Registry (GHCR or DockerHub) - on push to `main`.

### Checks
- [ ] CI runs on every PR.
- [ ] CI fails if tests/lint fail.
- [ ] Docker image is pushed on merge to main.

### AC
-   Pipeline duration < 10 minutes.
-   Automated deployments (if target env exists).

### Plan to Docs
-   N/A

### QC
-   Verify secrets are not exposed in logs.

### Test Scenario
-   **Scenario 1:** Create a PR with a lint error. Verify CI fails. Fix it. Verify CI passes.

---

## Task 3: Security & Secrets Management (Vault Integration)

*Note: Per architecture, HashiCorp Vault is desired. For MVP, we might start with Env Vars, but here is the Vault plan.*

### Steps
1.  Set up HashiCorp Vault (dev mode for local, production cluster for prod).
2.  Configure Vault policies for the app (`database` credentials, `next-auth` secret).
3.  Integrate `node-vault` or similar client in Next.js to fetch secrets at runtime/startup.

### Checks
-   App can authenticate with Vault.
-   App can retrieve DB connection string.

### AC
-   No secrets stored in `.env` files in production.

### Plan to Docs
-   Document Vault setup and policy requirements.

### QC
-   Verify token rotation/TTL.

### Test Scenario
-   **Scenario 1:** Rotate DB password in Vault. Restart app. Verify it picks up new credentials.

---

## Task 4: Monitoring & Observability

### Steps
1.  Integrate a logging solution (e.g., Pino, or just stdout for Docker logging drivers).
2.  Set up basic error tracking (Sentry - optional for MVP but recommended).
3.  Check Health Endpoint (`/api/health`).

### Checks
-   Logs are structured (JSON).
-   Health endpoint returns 200 OK and DB status.

### AC
-   System is observable.

### Plan to Docs
-   N/A

### QC
-   Check log verbosity levels.

### Test Scenario
-   **Scenario 1:** Trigger a 500 error. Check logs for stack trace.
