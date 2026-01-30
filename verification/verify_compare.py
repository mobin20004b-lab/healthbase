
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # 1. Visit Comparison Page with no IDs
    print("Navigating to /en/compare")
    try:
        page.goto("http://localhost:3000/en/compare")
        page.wait_for_load_state("networkidle")

        # Expect "Compare Clinics" title
        if page.get_by_role("heading", name="Compare Clinics").is_visible():
            print("Found 'Compare Clinics' heading")
        else:
            print("Could not find 'Compare Clinics' heading")

        # Expect "No clinics selected" message
        if page.get_by_text("No clinics selected").is_visible():
            print("Found 'No clinics selected' message")
        else:
            print("Could not find 'No clinics selected' message")

        page.screenshot(path="verification/compare_empty.png")
        print("Screenshot saved to verification/compare_empty.png")
    except Exception as e:
        print(f"Error visiting /en/compare: {e}")

    # 2. Visit Comparison Page with random ID
    print("Navigating to /en/compare?ids=nonexistent")
    try:
        page.goto("http://localhost:3000/en/compare?ids=nonexistent")
        page.wait_for_load_state("networkidle")

        page.screenshot(path="verification/compare_nonexistent.png")
        print("Screenshot saved to verification/compare_nonexistent.png")
    except Exception as e:
        print(f"Error visiting /en/compare?ids=nonexistent: {e}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
