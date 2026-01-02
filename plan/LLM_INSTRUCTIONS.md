# LLM Instructions & Workflow
use bun and postgresql
This document defines how an LLM (or developer) should interact with this project structure to ensure consistent, high-quality progress.
always use bun
## Core Philosophy

1.  **Plan First:** Never write code without a clear task from the `plan/` directory.
2.  **State Matters:** Always read `plan/current_state.md` to know where we are.
3.  **Verify:** Never mark a task done without running the **Checks** and **Test Scenarios** defined in the plan.
4.  **Update:** The job isn't done until the plan is updated to reflect reality.

## Workflow Steps

### 1. Assessment
- **Action:** Read `plan/current_state.md`.
- **Goal:** Identify the **Current Iteration** and **Active Tasks**.
- **Context:** Read the specific plan file for the task (e.g., `plan/backend.md` if the task is "Initialize DB").

### 2. Task Selection
- Pick the highest priority incomplete task.
- **Example:** "Task 1: Initialize Next.js project" from `plan/backend.md`.

### 3. Execution (Iterative)
- **Step 3.1:** Create/Edit files as described in the **Steps** section of the task.
- **Step 3.2:** If the plan says "Create generic UI components", create them one by one.
- **Step 3.3:** Use tools (bash, file editors) to implement.

### 4. Verification (The Gate)
- **Action:** Run the **Checks** listed in the task.
- **Example:**
    - If task is "Setup DB", run `npx prisma studio` (or equivalent check) to verify tables exist.
    - If task is "Create Component", run the specific test or check the render.
- **Rule:** If verification fails, **fix the code**. Do not update the plan to say it's done if it's broken.

### 5. Documentation & QC
- **Action:** Check the **AC (Acceptance Criteria)**.
- **Action:** Update any documentation if the **Plan to Docs** section requires it.

### 6. State Update
- **Action:** Edit `plan/current_state.md`.
- **Change:** Mark the specific KR or Task as `[x] Done`.
- **Action:** (Optional) Update the specific plan file (e.g., `plan/backend.md`) to mark sub-steps as completed if granular tracking is needed.

## File Structure Guide

- `plan/current_state.md`: The Source of Truth for progress.
- `plan/product.md`: The "Bible" of requirements. Do not change unless requirements change.
- `plan/backend.md`, `frontend.md`, etc.: Implementation details.
- `src/` (or `app/`): The actual code.

## Example Interaction

**User:** "Do the next task."

**LLM:**
1.  Reads `plan/current_state.md`. Sees "Active Task: Initialize Project".
2.  Reads `plan/backend.md`. Finds "Task 1: Initialize Next.js...".
3.  Executes `npx create-next-app ...`.
4.  Executes `npm install prisma`.
5.  Verifies with `npm run dev`.
6.  Updates `plan/current_state.md` -> "Task 1 Done".



files:
[text](backend.md) [text](current_state.md) [text](design.md) [text](devops.md) [text](frontend.md) [text](LLM_INSTRUCTIONS.md) [text](mataill3.md) [text](plan.md) [text](pr.md) [text](product.md) [text](remaining_tasks.md) [text](uiux.md) [text](user_flow.md)