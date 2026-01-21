import os
from playwright.sync_api import sync_playwright

def verify_search(page):
    # Navigate to the search page
    page.goto("http://localhost:3000/en/search")

    # Wait for the filters to be visible
    page.wait_for_selector("text=Filters")

    # Take a screenshot of the initial state (likely empty or with seed data if any)
    page.screenshot(path="verification/search_page_initial.png")

    # Check if "No clinics found" message is present (since DB is likely empty)
    # or if clinics are present
    content = page.content()
    if "No clinics found" in content:
        print("No clinics found message visible")
    else:
        print("Clinics found or message not visible")

    # Try to type in search
    page.fill("input[placeholder='Search...']", "Heart")
    page.press("input[placeholder='Search...']", "Enter")

    page.wait_for_timeout(2000) # Wait for network
    page.screenshot(path="verification/search_page_query.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set viewport to standard desktop
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        try:
            verify_search(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
