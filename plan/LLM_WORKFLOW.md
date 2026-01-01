# LLM Workflow Instructions

This document instructs the LLM agent on how to proceed with the development of the Yazd Health Transparency Platform.

## Workflow Loop

For each session/run, follow these steps:

1.  **Read State:**
    *   Read `plan/current_state.md` to identify the next "To Do" task.
    *   Read `plan/current_state_okr.md` to understand the high-level goals.
    *   Read the specific plan file for the task (e.g., `plan/backend.md` if the task is B-1).

2.  **Pick Task:**
    *   Select the highest priority "To Do" task that is not blocked.
    *   *Example:* If "Backend Foundation" is To Do, pick that.

3.  **Execute:**
    *   Follow the "Steps" defined in the specific plan file.
    *   Write code, create files, run commands.
    *   **CRITICAL:** Verify every step. Do not assume success. Use `ls`, `cat`, or test scripts to confirm.

4.  **Verify & Check:**
    *   Run the "Checks" listed in the plan file.
    *   Ensure "Acceptance Criteria (AC)" are met.
    *   Run the "Test Scenario" described in the plan.

5.  **Update State:**
    *   Update `plan/current_state.md`: Mark the task as "Done" or "In Progress". Update the "Progress Log".
    *   Update `plan/current_state_okr.md`: Update the progress % of the relevant Key Result.

6.  **Handover:**
    *   If the session ends, leave a clear message in `plan/current_state.md` about what was finished and what is next.

## Rules

*   **File Structure:** Always respect the Next.js App Router structure.
*   **Code Quality:** proper typing (TypeScript), no `any` if possible.
*   **Testing:** If a step involves logic, verify it.
*   **Documentation:** Update docs if the plan says "Plan to Docs".

## Example

**Context:** You start a run.
1.  You read `plan/current_state.md`. It says "B-1: Foundation Setup" is To Do.
2.  You read `plan/backend.md`. Task 1 has 6 steps.
3.  You execute Step 1 (Init Next.js). You verify it created the folder.
4.  You execute Step 2 (Postgres). You verify connection.
5.  ...
6.  You finish Task 1.
7.  You update `plan/current_state.md` -> B-1 is DONE.
8.  You update `plan/current_state_okr.md` -> KR 1.1 is 100%.
