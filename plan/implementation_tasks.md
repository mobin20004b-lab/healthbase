# Comprehensive Implementation Plan

This document synthesizes the vision from `plan/mataill3.md` (Material 3 Expressive, Bento Grids, Spatial UI) with the technical requirements of Next.js 16+, Tailwind CSS, and the specific needs of the Topmedica platform. It serves as the master task list for the next phase of development.

## 1. Project Configuration & Design System Foundation

**Goal**: Establish the technical and visual bedrock for the application.

*   [ ] **1.1. Enhance Tailwind Configuration**
    *   **Source**: `plan/mataill3.md`, `src/app/globals.css`
    *   **Action**: Update `tailwind.config.ts` to fully expose the M3 colors and custom shapes defined in `globals.css`. Ensure `extend.colors` maps `primary`, `secondary`, `tertiary`, `surface`, `error` etc. to the CSS variables.
    *   **Check**: `bg-primary` results in `#4C662B` (light) or `#B1D18A` (dark).
*   [ ] **1.2. Implement Shape Utilities**
    *   **Source**: `plan/mataill3.md` (Section 2.1)
    *   **Action**: Verify utility classes `.m3-shape-flower` and `.m3-shape-squircle` work as expected. Add `transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)]` to base interactive elements for "Motion Physics".
*   [ ] **1.3. Typography Setup**
    *   **Source**: `plan/uiux.md`
    *   **Action**: Ensure `next/font` is configured for:
        *   **Persian**: Vazirmatn (Variable).
        *   **English**: Inter (Variable) or Roboto Flex.
    *   **Check**: Bi-directional text renders correctly with mixed English/Persian.

## 2. Core UI Component Library (Material 3 Expressive)

**Goal**: Build the reusable LEGO blocks. *Note: Use Shadcn UI as a base where possible, but heavily customize to match M3 specs.*

*   [ ] **2.1. Base Components**
    *   **Button**: M3 variants (Filled, Tonal, Outlined, Text, Elevated). Implement "Shape Morphing" on click (Flower -> Rect).
    *   **Card**: Elevate variants (Elevated, Filled, Outlined).
    *   **Input Fields**: Outlined and Filled variants with floating labels (M3 style).
*   [ ] **2.2. Navigation Components**
    *   **Navigation Rail** (Admin): Left-side vertical nav with glassmorphism (`backdrop-blur-md`).
    *   **Sticky Header** (Public): Glassmorphic header that blurs content behind it.
*   [ ] **2.3. Data Display Components**
    *   **Bento Grid Container**: A responsive grid wrapper handling 1x1, 1x2, 2x1, 2x2 spans.
    *   **Bento Card**: Base card style for grid items.
    *   **Clinic Card (Glassmorphic)**: For search results (Avatar + Availability Pill + Compare Checkbox).

## 3. Layouts & Structure

**Goal**: Implement the shell for different user roles.

*   [ ] **3.1. Public Layout** (`(marketing)`)
    *   Header (Logo, Search Trigger, Login), Footer (Links, Social).
    *   Responsive behavior: Hamburger menu on mobile.
*   [ ] **3.2. Patient Layout** (`(patient)`)
    *   Secure wrapper.
    *   Bottom Navigation Bar (Mobile) / Side Rail (Desktop).
*   [ ] **3.3. Admin Layout** (`(admin)`)
    *   **Source**: `plan/mataill3.md` (Section 7.1)
    *   Navigation Rail (Left).
    *   High-density container.

## 4. Feature Implementation: Public Zone

**Goal**: "Trust Calibration" and User Funnel.

*   [ ] **4.1. Landing Page (`/`)**
    *   **Hero Section**: 3D Node Visualization (using Three.js/React Three Fiber or abstract SVG animation) + "Liquid" environment.
    *   **Smart Search Bar**: "Zocdoc-style" large input.
    *   **Trust Bento Grid**:
        *   Cell 1: "15k+ Specialists" (Counter).
        *   Cell 2: "HIPAA Secure" (Lock animation).
        *   Cell 3: Testimonials.
    *   **Scroll Animations**: Reveal "Find", "Book", "Heal" text.
*   [ ] **4.2. Search & Discovery (`/search`)**
    *   **Split Screen Layout**: List (Left) + Map (Right) on Desktop. Toggle on Mobile.
    *   **Filters**: Glassmorphic filter panel.
    *   **Provider Card**: Implementation of the component from 2.3.
*   [ ] **4.3. Comparison Tool (`/compare`)**
    *   **Matrix View**: Sticky header row.
    *   **Visualizers**:
        *   Availability (Text color).
        *   Rating (Star breakdown).
        *   Cost (Wallet icon + Insurance logic).
*   [ ] **4.4. About & Blog**
    *   **Scrollytelling Timeline**: SVG path animation.
    *   **Team Grid**: Hover effects (Video loop/Cinemagraph).

## 5. Feature Implementation: Patient Portal

**Goal**: "Reassurance" and Personalization.

*   [ ] **5.1. Dashboard (`/dashboard`)**
    *   **Personalized Bento Grid**:
        *   Logic to switch layouts (Healthy vs. Chronic).
        *   **Widgets**: Activity Summary (Chart), Care Plan (Progress Circle), Medication Tracker (Checklist with Haptic Micro-Reward).
*   [ ] **5.2. Medical Records (`/records`)**
    *   **Health Passport**: Top card with Blood Type, Allergies.
    *   **Lab Results**: Table with Sparkline Charts and "Normal Range" gradient bars.

## 6. Feature Implementation: Admin Portal

**Goal**: "Efficiency" and "Density".

*   [ ] **6.1. Overview (`/admin/overview`)**
    *   **Sankey Diagram**: Patient Flow visualization.
    *   **Revenue Tiles**: Numeric summaries.
*   [ ] **6.2. Patient Management (`/admin/patients`)**
    *   **High-Density Table**: Toggle for Row Height (52dp, 40dp, 32dp).
    *   **Sticky Columns**: Name/MRN.
    *   **Quick Actions**: Hover toolbar.
*   [ ] **6.3. Schedule (`/admin/schedule`)**
    *   **Resource View**: Columns by Room/Doctor.
    *   **Drag & Drop**: Physics-based motion (tilt & snap).

## 7. Technical Infrastructure

*   [ ] **7.1. Internationalization (i18n)**
    *   Ensure `[locale]` routing covers all new pages.
    *   RTL mirroring for Admin Navigation Rail.
*   [ ] **7.2. Middleware & RBAC**
    *   Implement role checks (Patient vs Admin).
    *   Redirect logic for unauthorized access.
*   [ ] **7.3. Performance & SEO**
    *   Generate `sitemap.xml` (Public only).
    *   `robots.txt` exclusion for Private zones.

## 8. Quality Control & Testing

*   [ ] **8.1. Accessibility Audit**
    *   Verify Color Contrast (M3 colors are usually safe but check custom combinations).
    *   Test Screen Reader navigation on Bento Grids.
*   [ ] **8.2. User Acceptance Testing**
    *   Task: "Find a cardiologist and compare costs."
    *   Task: "Reschedule an appointment as Admin."
