# Frontend Implementation Plan

This document outlines the frontend engineering tasks for the Yazd Health Transparency Platform MVP, using Next.js App Router.

## Task 1: Project Scaffolding

### Steps
1.  Create Next.js app (`npx create-next-app`).
2.  Install dependencies: `prisma`, `@prisma/client`, `next-auth`, `zod`, `react-hook-form`, `lucide-react`, `clsx`, `tailwind-merge`.
3.  Configure `next-intl` for i18n routing (`/[locale]/...`).
4.  Set up directory structure (`app`, `components`, `lib`, `actions`).
5.  Configure ESLint and Prettier.

### Checks
- [ ] App builds successfully.
- [ ] Routing (`/fa`, `/en`) works.
- [ ] Folder structure is established.

### Acceptance Criteria (AC)
-   Clean project base.
-   Localization routing is functional.

### Plan to Docs
-   Update `CONTRIBUTING.md`.

### QC
-   Verify no circular dependencies.

### Test Scenario
-   **Scenario 1:** Run `npm run dev`. Visit `localhost:3000/en` and `localhost:3000/fa`.

---

## Task 2: Component Implementation

### Steps
1.  Implement atomic components (`Button`, `Input`, `Textarea`, `Select`, `Checkbox`).
2.  Implement structural components (`Header`, `Footer`, `Sidebar`, `Container`).
3.  Implement data display components (`Card`, `Badge`, `RatingStars`, `Pagination`).
4.  Implement interactive components (`Modal`, `Toast`, `Dropdown`).

### Checks
- [ ] All components are exported and usable.
- [ ] Components support props for variants and sizes.
- [ ] Components are accessible (aria attributes).

### Acceptance Criteria (AC)
-   Components match the design system.
-   Components are responsive.

### Plan to Docs
-   Storybook (optional, or just a components showcase page).

### QC
-   Test components with long text to ensure no layout breakage.

### Test Scenario
-   **Scenario 1:** Create a test page using the `Card` and `Button` components. Verify rendering.

---

## Task 3: Feature Integration (Client <-> Server)

### Steps
1.  Implement Server Actions for form submissions (Login, Register, Review, Profile Update).
2.  Implement Data Fetching in Server Components (Clinic Lists, Details).
3.  Implement Client Components for interactivity (Search filters, Favorites toggle).
4.  Connect Search bar to URL search params.

### Checks
- [ ] Forms submit data to DB via Server Actions.
- [ ] Pages render data fetched from DB.
- [ ] Search filters update the URL and trigger re-fetch.

### Acceptance Criteria (AC)
-   Seamless data flow.
-   Loading states (Suspense/Skeletons) are shown during fetching.
-   Error boundaries handle crashes.

### Plan to Docs
-   N/A

### QC
-   Verify proper error handling on network failure.
-   Check for hydration errors.

### Test Scenario
-   **Scenario 1:** Search for "Dentist". Verify URL changes to `?q=Dentist`. Verify list updates.
-   **Scenario 2:** Submit a form with invalid data. Verify server-side validation error is displayed on client.

---

## Task 4: State Management & Optimization

### Steps
1.  Use URL Search Params for global state (Filters, Pagination).
2.  Use React Context for Auth State (SessionProvider) and UI preferences (Theme/Toast).
3.  Implement `generateMetadata` for SEO (Dynamic titles/descriptions).
4.  Optimize images (`next/image`).

### Checks
- [ ] Refreshing a filtered page keeps the filters.
- [ ] SEO tags are present in `<head>`.
- [ ] Images load lazily and are sized correctly.

### Acceptance Criteria (AC)
-   Lighthouse score > 90 (Performance, SEO, Accessibility).
-   State persists on refresh where appropriate (URL).

### Plan to Docs
-   N/A

### QC
-   Verify canonical URLs.

### Test Scenario
-   **Scenario 1:** Filter clinics by "City: Yazd". Copy URL. Open in incognito. Verify filter is applied.
