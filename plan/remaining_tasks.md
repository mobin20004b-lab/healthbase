# Remaining Tasks & Unimplemented Features

This document consolidates all tasks and features identified in the `plan/` directory that have not yet been implemented or marked as completed in `current_state.md`.

## 1. Infrastructure & Security
- [ ] **CI/CD Pipeline:** Setup GitHub Actions for automated linting, type checking, and testing (`plan/devops.md`).
- [ ] **NextAuth Integration:** Implement NextAuth for secrets management and role-based permissions (`plan/pr.md`).
- [ ] **Security Audit:** Conduct a full RBAC check to ensure proper data isolation between Admin, Clinic, and User roles (`plan/current_state.md`).
- [ ] **Audit Logs:** Implement an immutable audit log for all administrative and system actions (`plan/plan.md`, `plan/design.md`).
- [ ] **Deployment Strategy:** Finalize production deployment setup (Vercel or VPS with Nginx and SSL) (`plan/devops.md`).

## 2. Product Features
- [ ] **Inquiry System:** Implement a "Request Info" lead generation system to replace direct booking in MVP (`plan/pr.md`, `plan/plan.md`).
- [ ] **Educational Content:** Add structured educational content for services (Preparation instructions, Recovery info, FAQs) (`plan/plan.md`, `plan/backend.md`).
- [ ] **Equipment & Facilities:** Add ability for clinics to list medical equipment (MRI, CT, etc.) as quality signals (`plan/pr.md`).
- [ ] **Geo-Search:** Implement "Clinics Near Me" functionality using PostGIS (`plan/pr.md`).
- [ ] **Verified Visit Workflow:** Implement receipt/document upload for reviews to grant "Verified Visit" status (`plan/user_flow.md`, `plan/plan.md`).

## 3. Dashboards & Analytics
- [ ] **Basic Analytics:** Implement counters for profile views and search appearances for clinic owners (`plan/plan.md`, `plan/backend.md`).
- [x] **Taxonomy Management:** Create an admin interface for managing medical categories, specialties, and insurance lists (`plan/current_state.md`).
- [ ] **AI-Powered Analytics:** Implement patient sentiment analysis and predictive performance insights for clinic dashboards (`plan/design.md`).

## 4. Advanced UI/UX (2025 Vision)
- [ ] **Material Design 3 Expressive:** Implement dynamic shape morphing and physics-based motion systems (`plan/mataill3.md`).
- [ ] **AI Hyper-Personalization:** Implement real-time adaptive layouts and "Recommended for You" sections (`plan/design.md`).
- [ ] **Explainable AI (XAI):** Add "Why is this recommended?" snippets and confidence scores to search results (`plan/design.md`).
- [ ] **Glassmorphism 2.0:** Apply "Liquid Glass" materials to navigation rails and floating elements (`plan/mataill3.md`).
- [ ] **Favorites Comparison Tool:** Build an AI-driven tool to compare 2-3 favorited clinics side-by-side (`plan/design.md`).
- [ ] **Patient Stories:** Implement a dedicated section for video testimonials and detailed patient stories (`plan/design.md`).

## 5. Launch Readiness
- [ ] **Seed Data:** Onboard and verify a minimum of 50 pilot clinics (`plan/current_state.md`).
- [ ] **Usability Testing:** Conduct 5 Persian and 3 English usability tests to de-risk the search-to-detail flow (`plan/plan.md`, `plan/current_state.md`).
- [ ] **SEO Optimization:** Finalize metadata, sitemaps, and robots.txt for production (`plan/plan.md`).
