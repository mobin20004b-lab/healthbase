# Comprehensive Implementation Plan

This document synthesizes the vision from `plan/mataill3.md` (Material 3 Expressive, Bento Grids, Spatial UI) with the technical requirements of Next.js 16+, Tailwind CSS, and the specific needs of the Topmedica platform. It serves as the master task list for the next phase of development.

## 1. Project Configuration & Design System Foundation

**Goal**: Establish the technical and visual bedrock for the application.

*   [x] **1.1. Enhance Tailwind Configuration**
    *   **Source**: `plan/mataill3.md`, `src/app/globals.css`
    *   **Action**: Update `tailwind.config.ts` to fully expose the M3 colors and custom shapes defined in `globals.css`. Ensure `extend.colors` maps `primary`, `secondary`, `tertiary`, `surface`, `error` etc. to the CSS variables.
    *   **Note**: Using Tailwind v4 CSS-first configuration via `@theme inline` in `globals.css` instead of `tailwind.config.ts`.
    *   **Sub-tasks**:
        *   Map `primary`, `on-primary`, `primary-container`, `on-primary-container` to CSS variables.
        *   Map `secondary`, `on-secondary`, `secondary-container`, `on-secondary-container`.
        *   Map `tertiary`, `on-tertiary`, `tertiary-container`, `on-tertiary-container`.
        *   Map `surface`, `on-surface`, `surface-variant`, `on-surface-variant`.
        *   Map `outline`, `outline-variant`.
        *   Map `error`, `on-error`, `error-container`, `on-error-container`.
        *   Add `borderRadius` extension for `xl`, `2xl`, `3xl`.
    *   **Acceptance Criteria**:
        *   Running `bg-primary` results in `#4C662B` (light) or `#B1D18A` (dark) in the browser.
        *   `bg-surface-container` works as expected.
*   [x] **1.2. Implement Shape Utilities**
    *   **Source**: `plan/mataill3.md` (Section 2.1)
    *   **Action**: Verify utility classes in `src/app/globals.css` and ensure they are usable.
    *   **Sub-tasks**:
        *   Define `.m3-shape-flower` using `clip-path: polygon(...)` (already in globals, verify usage).
        *   Define `.m3-shape-squircle` using `border-radius: ...`.
        *   Add a standard transition utility class `m3-motion` with `transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)]` for "Motion Physics".
    *   **Acceptance Criteria**:
        *   A test button with `m3-shape-flower` renders as a flower.
*   [x] **1.3. Typography Setup**
    *   **Source**: `plan/uiux.md`
    *   **Action**: Ensure `next/font` is configured for proper bilingual support.
    *   **Sub-tasks**:
        *   Configure `Vazirmatn` (variable) for Persian.
        *   Configure `Inter` (variable) for English.
        *   Configure `Roboto Mono` for data tables.
        *   Set up `font-family` utility classes in Tailwind (`font-sans` includes both).
    *   **Acceptance Criteria**:
        *   Persian text renders in Vazirmatn.
        *   English text renders in Inter.
        *   Numbers in tables render in Roboto Mono.

## 2. Core UI Component Library (Material 3 Expressive)

**Goal**: Build the reusable LEGO blocks. *Note: Use Shadcn UI as a base where possible, but heavily customize to match M3 specs.*

*   [x] **2.1. Button Component (`src/web/components/ui/button.tsx`)**
    *   **Action**: Create/Update the Button component to support M3 variants and "Shape Morphing".
    *   **Sub-tasks**:
        *   Variants: `filled` (default), `tonal` (secondary container), `outlined` (border outline), `text` (ghost), `elevated` (shadow).
        *   **Interaction**: Add an `isMorphing` prop or internal state that changes the shape from `rounded-xl` to `m3-shape-flower` (or vice versa) on click/hover.
        *   **Animation**: Use the `m3-motion` transition class.
*   [x] **2.2. Card Component (`src/components/ui/card.tsx`)**
    *   **Action**: Create M3 Card variants.
    *   **Sub-tasks**:
        *   Variants: `elevated` (shadow-md, bg-surface), `filled` (bg-surface-container-highest), `outlined` (border outline-variant, bg-surface).
        *   Props: `interactive` (adds hover elevation/state).
*   [x] **2.3. Input Fields (`src/components/ui/input.tsx`, `floating-label-input.tsx`)**
    *   **Action**: Implement M3 Text Fields with floating labels.
    *   **Sub-tasks**:
        *   Create `FloatingLabelInput` component.
        *   Variants: `outlined` (border rings), `filled` (bg-surface-container-highest with bottom border).
        *   States: Error state (red border + icon).
*   [x] **2.4. Navigation Rail (`src/components/ui/nav-rail.tsx`)**
    *   **Action**: Create the vertical navigation rail for the Admin dashboard.
    *   **Sub-tasks**:
        *   Container: Fixed width (e.g., 80px), `h-screen`, `sticky`, `top-0`.
        *   Styling: `backdrop-blur-md`, `bg-surface/80` (Glassmorphism).
        *   Items: Icon (24px) + Label (12px), centered stack.
        *   Active State: Pill-shaped indicator behind the icon.
        *   **RTL Support**: Ensure it sticks to the right in `dir="rtl"`.
*   [x] **2.5. Sticky Header (`src/web/components/ui/sticky-header.tsx`)**
    *   **Action**: Create the glassmorphic header for public pages.
    *   **Sub-tasks**:
        *   Styling: `backdrop-blur-md`, `bg-background/70`, `border-b border-outline-variant/20`.
        *   Z-index: Ensure it stays above content.
*   [x] **2.6. Bento Grid System (`src/web/components/ui/bento-grid.tsx`)**
    *   **Action**: Create a responsive grid wrapper.
    *   **Sub-tasks**:
        *   **Container**: CSS Grid with auto-rows. `grid-cols-1 md:grid-cols-4 gap-4`.
        *   **Item (`BentoItem`)**: Props for `colSpan` (1, 2, 4) and `rowSpan` (1, 2).
        *   **Responsive Logic**: On mobile, everything should be `col-span-1`.
*   [x] **2.7. Clinic Card (`src/web/components/clinics/clinic-card.tsx`)**
    *   **Action**: specific implementation for search results.
    *   **Sub-tasks**:
        *   **Glassmorphic Container**: `bg-surface-container-low/80 backdrop-blur`.
        *   **Layout**: Avatar (left/right), Info (center), Actions (end).
        *   **Components**: "Availability Pill" (Green/Amber), "Compare Checkbox".

## 3. Layouts & Structure

**Goal**: Implement the shell for different user roles.

*   [x] **3.1. Public Layout (`src/app/[locale]/(marketing)/layout.tsx`)**
    *   **Action**: Standard website layout.
    *   **Sub-tasks**:
        *   Import and use `StickyHeader`.
        *   Add `Footer` component.
        *   **Mobile**: Implement a Hamburger menu that opens a `Sheet` (Side drawer).
*   [x] **3.2. Patient Layout (`src/app/[locale]/(patient)/layout.tsx`)**
    *   **Action**: Authenticated layout for patients.
    *   **Sub-tasks**:
        *   **Desktop**: Use `NavigationRail` (or sidebar).
        *   **Mobile**: Use `BottomNavigationBar` (new component: `src/components/ui/bottom-nav.tsx`).
*   [ ] **3.3. Admin Layout (`src/app/[locale]/(admin)/layout.tsx`)**
    *   **Action**: High-density admin layout.
    *   **Sub-tasks**:
        *   Use `NavigationRail` (Left for LTR, Right for RTL).
        *   Main content area with `p-4` or `p-6`.

## 4. Feature Implementation: Public Zone

**Goal**: "Trust Calibration" and User Funnel.

*   [ ] **4.1. Landing Page (`src/app/[locale]/(marketing)/page.tsx`)**
    *   **Hero Section**:
        *   **Visual**: Integrate a lightweight 3D or abstract SVG animation (e.g., using `framer-motion` for "floating" nodes).
        *   **Copy**: "Convergence of Care, Intelligence, and Design".
    *   **Search Bar**: Large, centered input with "Zocdoc-style" dropdowns.
    *   **Trust Bento Grid**:
        *   Implement a 3-column bento grid.
        *   **Counter**: Animated number for "15k+ Specialists".
        *   **Lock**: Animated padlock icon for "HIPAA Secure".
        *   **Testimonials**: Carousel in the third cell.
    *   **Scroll Animations**: Use `framer-motion` `whileInView` for text reveal.
*   [ ] **4.2. Search & Discovery (`src/app/[locale]/(marketing)/search/page.tsx`)**
    *   **Layout**: `grid grid-cols-1 lg:grid-cols-3 h-screen`.
    *   **Left Panel (List)**: Scrollable list of `ClinicCard`.
    *   **Right Panel (Map)**: Placeholder for Google Maps/Leaflet. Fixed position.
    *   **Mobile Toggle**: Floating Action Button (FAB) to switch List/Map views.
    *   **Filters**: Sidebar or Drawer with checkboxes for Specialties, Insurance.
*   [ ] **4.3. Comparison Tool (`src/app/[locale]/(marketing)/compare/page.tsx`)**
    *   **Layout**: Table with sticky header row (First column: Labels, Other columns: Clinics).
    *   **Visualizers**:
        *   **Availability**: Green text "Tomorrow" vs Amber "3 weeks".
        *   **Rating**: Star icon + Bar chart (CSS based) for "Wait Time".
        *   **Cost**: Wallet icon + Price range.
*   [ ] **4.4. About & Blog**
    *   **Timeline (`/about`)**: Vertical line with dots. SVG path drawing animation triggered by scroll.
    *   **Team Grid**: Grid of photos. On hover, switch image src to a GIF/Video (Cinemagraph).

## 5. Feature Implementation: Patient Portal

**Goal**: "Reassurance" and Personalization.

*   [ ] **5.1. Dashboard (`src/app/[locale]/(patient)/dashboard/page.tsx`)**
    *   **Logic**: Fetch user profile. If `conditions.length > 0`, use "Chronic Layout", else "Healthy Layout".
    *   **Widgets**:
        *   **ActivityChart**: wrapper around Recharts (Bar/Line).
        *   **CarePlan**: Circular progress bar (SVG `stroke-dasharray`).
        *   **MedicationTracker**: List of checkboxes. On check: trigger Haptic (navigator.vibrate) and a checkmark animation.
*   [ ] **5.2. Medical Records (`src/app/[locale]/(patient)/records/page.tsx`)**
    *   **Health Passport**: Card with critical info (Blood Type, Allergies).
    *   **Lab Results Table**:
        *   Row: Test Name | Result | Normal Range (Visual).
        *   **Visual**: A gradient bar (Green center, Grey edges). A black triangle marker positioned by `left: ${percentage}%`.

## 6. Feature Implementation: Admin Portal

**Goal**: "Efficiency" and "Density".

*   [ ] **6.1. Overview (`src/app/[locale]/(admin)/overview/page.tsx`)**
    *   **Sankey Diagram**: Use a library like `nivo` or `recharts` (if supported) to show "Check-in" -> "Exam" -> "Discharge".
    *   **Revenue Tiles**: Simple Cards with Big Number + Trend Indicator (Green arrow up).
*   [ ] **6.2. Patient Management (`src/app/[locale]/(admin)/patients/page.tsx`)**
    *   **High-Density Table**:
        *   State: `density` ('compact' | 'standard' | 'comfortable').
        *   Row Height: `h-8` (compact), `h-12` (standard), `h-16` (comfortable).
    *   **Sticky Columns**: First two columns (`th`, `td`) have `sticky left-0 z-10 bg-surface`.
    *   **Quick Actions**: `opacity-0 group-hover:opacity-100` absolute div on the right of the row.
*   [ ] **6.3. Schedule (`src/app/[locale]/(admin)/schedule/page.tsx`)**
    *   **Resource View**:
        *   Grid: `grid-cols-[time_col,repeat(n,1fr)]`.
        *   **Drag & Drop**: Use `@dnd-kit/core`.
        *   **Physics**: On drag start, scale up the card (`scale-105 shadow-xl rotate-2`). On drop, snap back.

## 7. Technical Infrastructure

*   [ ] **7.1. Internationalization (i18n)**
    *   **Tasks**:
        *   Verify `src/middleware.ts` handles locale redirection.
        *   Ensure `src/i18n/request.ts` (or equivalent) loads `messages/en.json` and `messages/fa.json`.
        *   Test Admin Nav Rail mirroring in RTL mode (`flex-row-reverse` or equivalent logic).
*   [ ] **7.2. Middleware & RBAC**
    *   **Tasks**:
        *   Update `src/middleware.ts` to check `auth.user.role`.
        *   If `role !== 'ADMIN'` and path starts with `/admin`, redirect to `/unauthorized`.
*   [ ] **7.3. Performance & SEO**
    *   **Tasks**:
        *   Create `src/app/sitemap.ts`. Logic: Include `/`, `/about`, `/blog/*`, `/search`. Exclude `/dashboard`, `/admin`.
        *   Create `src/app/robots.ts`. Disallow `/admin`, `/dashboard`.

## 8. Quality Control & Testing

*   [ ] **8.1. Accessibility Audit**
    *   **Tools**: Use `axe-core` or Chrome DevTools Lighthouse.
    *   **Checks**:
        *   Color Contrast on `primary` buttons.
        *   ARIA labels on "Icon-only" buttons (like the Nav Rail icons).
        *   Keyboard navigation order in the Bento Grid.
*   [ ] **8.2. User Acceptance Testing (Manual)**
    *   **Scenario 1**: Login as Patient -> Go to Search -> Filter by "Cardiology" -> Open Clinic Detail -> Check "Compare" -> Go to Compare Page.
    *   **Scenario 2**: Login as Admin -> Go to Schedule -> Drag an appointment from "Room 1" to "Room 2".
