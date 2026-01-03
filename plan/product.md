Below are **(1) BRD**, **(2) MVP OpenAPI (refactored)**, **(3) Implementation Plan**, and **(4) UI/UX Requirements + UX research** for **Topmedica**: a clinic/service transparency & discovery platform (FA/EN), explicitly **without appointments in MVP**.

The PDF frames the core problem as **healthcare information asymmetry** and notes that local “nearby” solutions are mostly **location/appointment sites** that **don’t provide quality/price/service transparency**, while the goal is to publish information that meaningfully changes patient decisions.  

---

# 1) BRD — Business Requirements Document (MVP)

## 1.1 Background

Patients (and health tourists) have limited, inconsistent information about providers; this creates uncertainty and weak decision-making. 
The PDF indicates Iran lacks a true comparable platform; current sites are mainly mapping or appointment booking and don’t provide structured info about **services, quality, and prices**. 

## 1.2 Business objective

Deliver a public, bilingual transparency platform that:

* Helps users **find and choose** clinics/services confidently
* Creates **trust signals** (verified clinics, moderated reviews)
* Enables clinics to manage their public presence
* Collects usage insights to guide iteration

> The PDF also explicitly suggests later expansion into e-services like appointments, consultation, etc.—we’ll **architect for it**, but **exclude appointments from MVP**. 

## 1.3 Scope (MVP)

### In scope (MVP)

**Public**

* Clinic discovery: list + filter + sort + pagination
* Clinic details: services, contact, address, ratings/reviews
* Services directory + educational content
* Reviews (create + edit own + moderation workflow)
* Favorites (save/unsave clinics)
* Search + suggestions (Postgres-based for MVP)

**Clinic dashboard**

* Edit clinic profile (description, contacts, address, services)
* Basic analytics (views, search appearances)

**Admin**

* Verify/activate clinics
* Moderate flagged reviews
* Basic taxonomy management (optional if seeded)

**Platform**

* i18n: Persian (RTL) + English (LTR)
* Auth + user management + permissions via NextAuth
* Next.js full-stack + Postgres

### Out of scope (MVP)

* Appointments and scheduling (explicit requirement)
* Payments, telemedicine, chat
* Elastic/OpenSearch (defer; MVP uses Postgres FTS)
* File uploads (optional P1 unless you need verification docs)

## 1.4 Stakeholders

* Business owner / sponsor
* Product & UX
* Engineering (Next.js/Postgres)
* Admin/moderation operators
* Clinic operators
* End-users (patients + tourists)

## 1.5 Personas & key journeys

### Patient / local

* Search → filter → compare mentally → clinic detail → contact/map → favorite → review after visit

### Tourist

* English landing → search by service/location → trust cues → contact → save/share

### Clinic operator

* Login → dashboard → update profile/services → check analytics

### Admin

* Review pending clinics → verify → moderate reviews → manage taxonomy

## 1.6 Functional requirements (MVP)

### FR1: Clinic discovery

* Filter: location, service category, specialty, insurance, rating, name
* Sort: name/rating (distance optional)
* Pagination
* SEO-friendly pages

### FR2: Clinic details

* Public profile: description, address, contact, services, specialties, insurance
* Reviews list with scoring breakdown
* “Verified clinic” badge when verified

### FR3: Reviews

* Logged-in user can create review
* User can edit/delete own review (within policy window if desired)
* Review statuses: pending/approved/rejected/flagged
* Admin moderation: approve/reject
* Anti-abuse basics (rate limit, basic profanity filter optional)

### FR4: Services & content

* Service categories list
* Service detail: instructions, required docs, FAQ, price range (if available)
* Educational content per service (FA/EN)

### FR5: Favorites

* Add/remove favorite
* Favorites page

### FR6: Clinic dashboard

* Clinic can edit own profile and services
* Clinic can see basic analytics counters

### FR7: Auth + user & permission management (NextAuth)

* Register/login (credentials)
* Roles: admin, clinic, user (optional editor)
* Role-based access enforcement server-side + UI gating
* Admin can assign “clinic” role to a user and bind to a clinic

## 1.7 Non-functional requirements

* **Security**: OWASP basics, secure sessions, role checks, audit logs (admin actions)
* **Privacy**: minimal PII exposure; moderation safeguards
* **Performance**: fast search/listing; caching for popular pages
* **Accessibility**: WCAG-aware components, keyboard nav
* **i18n/RTL**: full Persian RTL support
* **Observability**: error tracking, request logs, analytics events

## 1.8 Success metrics (MVP)

* Search → clinic detail CTR
* Contact intent (call/email/map clicks)
* Favorite rate
* Review submission rate & approval rate
* # verified clinics, # clinics updating profile

## 1.9 Risks & mitigations

* **Data completeness** → start with curated pilot dataset + “last updated” labels
* **Trust/abuse** → moderation workflow + rate limiting
* **RTL UX issues** → dedicated Persian QA, typography, number formatting
* **Clinic adoption** → simple claim/onboarding flow + admin-assisted setup

---

# 2) Phase 2 Roadmap (Future Expansion)

## 2.1 Online Appointment Scheduling
*   **Real-time Calendar**: Providers manage availability slots.
*   **Booking Engine**: Patients select slots, receive confirmation SMS/Email.
*   **Waitlist Management**: Auto-notify patients if a slot opens up.

## 2.2 Telemedicine & Virtual Care
*   **WebRTC Integration**: Secure, in-browser video consultations.
*   **Document Sharing**: Upload lab results/images during the call.
*   **Digital Prescriptions**: PDF generation for pharmacy pickup.

## 2.3 AI-Powered Patient Assistant
*   **Symptom Checker**: "Where does it hurt?" guided flow to recommend specialists.
*   **Intelligent Search**: Vector-based semantic search ("Back pain doctor near me").
*   **Voice Navigation**: Voice commands for accessibility.

## 2.4 Mobile Application
*   **React Native**: Native iOS and Android apps sharing the same codebase.
*   **Push Notifications**: Appointment reminders, result alerts.
*   **Offline Mode**: View saved clinics and health records without internet.

---

# 3) Implementation plan (Next.js + Postgres + NextAuth)

The PDF’s sample plan includes phases like team setup, UI design, data gathering, implementation, marketing. 
Below is an engineering-ready MVP plan aligned with your constraints.

## 3.1 Architecture decisions (MVP)

* **Next.js App Router** (frontend + API route handlers)
* **Postgres + Prisma**
* **NextAuth** (Credentials provider initially)
* **RBAC** enforced on server:

  * `admin`, `clinic`, `user` (+ optional `editor`)
* Search MVP:

  * Postgres Full Text Search + trigram suggestions
* i18n:

  * `next-intl` + `/fa` & `/en` routes, RTL support

## 3.2 Workstreams & tasks

### Workstream A — Foundation (P0)

* Repo scaffolding (lint/test/CI)
* Prisma schema + migrations
* Seed scripts (service categories, insurance, cities)
* NextAuth:

  * user table, password hashing, session strategy
  * role in session token
* Authorization helpers:

  * `requireRole()`, `requireClinicOwnership(clinicId)`

### Workstream B — Public product (P0)

* Pages:

  * Landing
  * Clinics list/search
  * Clinic detail
  * Services list/detail
  * Service educational content
* API:

  * `/clinics` list + detail
  * `/search`, `/search/suggestions`
* SEO:

  * metadata, sitemap, robots

### Workstream C — Reviews & favorites (P0)

* Reviews:

  * create/update/delete
  * statuses + moderation fields
* Favorites:

  * add/remove/list

### Workstream D — Clinic dashboard (P0)

* Claim/assignment model:

  * admin binds `userId → clinicId`
* Dashboard profile update
* Services management for a clinic (simple CRUD)
* Analytics counters (daily table)

### Workstream E — Admin console (P0)

* Pending clinics list
* Verify clinic action
* Flagged reviews list + approve/reject
* Audit log for admin actions

### Workstream F — i18n & RTL QA (P0)

* Translation keys coverage
* Persian typography + RTL layout testing
* Locale-specific formatting (numbers/dates)

## 3.3 Database (Prisma-level outline)

Core tables:

* `User(id, email, fullName, role, status, passwordHash, createdAt)`
* `Clinic(id, name, description, status, verifiedAt, contact..., lat/lng, city...)`
* `Service(id, clinicId, name, category, description, ...)`
* `ServiceContent(id, serviceId, locale, html, faqJson)`
* `Review(id, clinicId, userId, rating, subscores..., status, createdAt)`
* `Favorite(userId, clinicId, createdAt)`
* `ClinicUser(userId, clinicId)` (ownership mapping)
* `AnalyticsDaily(clinicId, date, profileViews, searchAppearances)`
* `AuditLog(actorUserId, action, entityType, entityId, payload, createdAt)`

## 3.4 Security & quality gates

* Rate limiting on login, review create, suggestions endpoint
* Input validation (zod)
* Audit logs for admin actions
* Tests:

  * unit tests for permission guards
  * integration tests for key endpoints (clinics list, review create)

---

# 4) UI/UX requirements (search-focused, modern, minimal animation) + UX research

## 4.1 Visual style (simple, modern)

* Clean typography, generous whitespace, clear hierarchy
* Minimal animation:

  * only subtle hover/focus states
  * short fade for page transitions optional (can be off for “prefers-reduced-motion”)
* Consistent card system (clinic cards, service cards)
* Soft elevation/shadow (light), rounded corners (medium)

## 4.2 i18n & RTL rules (must-have)

* Persian locale:

  * `dir="rtl"` for `/fa/*`
  * RTL-safe components (tabs, pagination, breadcrumbs)
* English locale:

  * `dir="ltr"`
* Locale toggler visible in header
* Numerals:

  * allow Persian digits in FA UI (or keep Latin but be consistent)
* Fonts:

  * Persian-friendly font for FA, neutral sans for EN

## 4.3 Search (Reash) UX requirements — the core screen

This is the most important flow because the product’s value is making provider info **discoverable and comparable**, not appointment booking. 

### Search entry points

* Global search bar in header (sticky on mobile as user scrolls)
* Landing search module with:

  * input + “city” selector
  * quick chips for common categories (dentistry, cardiology, …)

### Results page layout

* **Mobile-first**
* Top: search bar + filter button
* Filters in:

  * mobile: bottom sheet / full-screen panel
  * desktop: left sidebar
* Results area:

  * cards with key trust info: rating, verified badge, top categories, location, quick actions (call, map, favorite)

### Required filters (MVP)

* City/area
* Service category
* Specialty
* Insurance
* Rating (min)
* Sort (name/rating/newest)

### Result card content (MVP)

* Clinic name
* Verified badge (if verified)
* Avg rating + count
* Address snippet + distance (optional later)
* Top services/specialties (max 2–3)
* Buttons: View, Favorite, Call/Email, Map

### Clinic detail page

* Above the fold:

  * name + verified + rating
  * primary action buttons (call/map)
* Sections:

  * About, Services, Insurance, Reviews
* Reviews:

  * distribution summary + recent reviews
  * “Write review” CTA

### Performance UX

* Skeleton loaders (no heavy animations)
* Prefetch clinic detail route on hover (desktop)

## 4.4 Forms UX (auth, reviews, dashboard)

* Auth:

  * clear error messages, password rules
* Review form:

  * structured scores (simple sliders or 1–5 chips)
  * comment optional but encouraged
* Dashboard:

  * autosave avoided (explicit save)
  * field validation inline
  * bilingual content fields (optional): FA required, EN optional

## 4.5 Accessibility requirements

* Keyboard navigation for filters, pagination
* Focus states visible
* ARIA for modal/filter panels
* Respect `prefers-reduced-motion`

## 4.6 UX research (lightweight MVP plan)

The PDF positions this as a transparency product affecting patient decisions. 
Minimum research to de-risk:

* 5 Persian usability tests (search → clinic detail → contact)
* 3 English usability tests (tourist flow)
* 2 clinic-operator tests (dashboard profile editing)
* Instrumentation after launch:

  * search-to-detail CTR, call/map clicks, favorites, review create
