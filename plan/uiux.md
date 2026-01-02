# UI/UX Design Plan: Topmedica

This document outlines the UI/UX design tasks for the Topmedica platform.

## 1. Design System Foundation

- **Task:** Establish the visual language.
- **Steps:**
    1.  Define Color Palette (Material 3 Expressive):
        - **Light Mode**: Primary (`#4C662B`), Secondary (`#586249`), Tertiary (`#386663`), Background (`#F9FAEF`), Surface (`#F9FAEF`), Error (`#BA1A1A`).
        - **Dark Mode**: Primary (`#B1D18A`), Secondary (`#C0CBAD`), Tertiary (`#A0D0CB`), Background (`#12140E`), Surface (`#12140E`), Error (`#FFFFB4AB`).
    2.  Define Typography:
        - Primary Persian/Arabic: **Vazirmatn**, **Matn**, **IRANSansX**.
        - Primary English/Latin: **Inter**, **Roboto**.
    3.  Define Spacing/Grid system: 8pt grid with **Bento Grid** layouts.
    4.  Create Icon Set: Material Symbols (Expressive).
- **Checks:**
    - Colors pass contrast ratios (WCAG AA).
    - Fonts render correctly in browser.
- **Acceptance Criteria:**
    - Documented Tailwind Config theme extension.
- **Plan to Docs:**
    - Update `plan/uiux.md` with palette codes.
- **QC:**
    - Visual check.
- **Test Scenario:**
    - Verify text readability on light gray background.

## 2. Wireframing & Prototyping

- **Task:** Create low-fidelity wireframes for key pages.
- **Steps:**
    1.  Wireframe Landing Page (Search focus).
    2.  Wireframe Search Results (List view, Filters).
    3.  Wireframe Clinic Detail (Information hierarchy).
    4.  Wireframe Review Modal.
- **Checks:**
    - User flows make sense logically.
- **Acceptance Criteria:**
    - Wireframes cover all requirements in Product Brief.
- **Plan to Docs:**
    - None (Artifacts stored externally or described here).
- **QC:**
    - Review against "Transparency" goal (Are prices visible?).
- **Test Scenario:**
    - Walkthrough: "Can I find the price of X service?"

## 3. Component Library Design

- **Task:** detailed design of reusable components.
- **Steps:**
    1.  Design "Clinic Card" (Compact vs Expanded).
    2.  Design "Service Row" (Name - Price - Insurance).
    3.  Design "Rating Widget" (Stars + Score Bars).
- **Checks:**
    - Components are responsive.
- **Acceptance Criteria:**
    - Consistent padding and styling.
- **Plan to Docs:**
    - None.
- **QC:**
    - Check Mobile view of Clinic Card.
- **Test Scenario:**
    - Shrink screen to 320px -> Content should stack, not overflow.

## 4. Accessibility & Localization Review

- **Task:** Ensure the design works for all users.
- **Steps:**
    1.  Review RTL mirroring (Icons flipping).
    2.  Check for color-blind friendly status colors (Success/Error).
- **Checks:**
    - Back buttons point correct way in RTL.
- **Acceptance Criteria:**
    - Pass Axe/Lighthouse accessibility audit.
- **Plan to Docs:**
    - None.
- **QC:**
    - Manual review in "fa" locale.
- **Test Scenario:**
    - Switch to Persian -> Arrow icons should point Left for "Back" (or Right depending on context/standard). *Correction: In RTL, 'Back' usually points Right (Next is Left).*
