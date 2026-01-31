from playwright.sync_api import sync_playwright

def verify_search_filters():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to search page...")
            # Use /en/search to avoid redirect issues
            page.goto("http://localhost:3000/en/search")

            # Wait for content
            page.wait_for_selector("text=Filters", timeout=10000)

            print("Checking for filters...")
            # Check specific checkboxes
            # Note: My implementation uses label text.
            # Click the label or the checkbox input?
            # page.get_by_label("Dentistry").check() might work if label is correctly associated.
            # I used htmlFor and id, so it should work.

            page.get_by_label("Dentistry").check()
            page.get_by_label("Cardiology").check()
            page.get_by_label("Public Health (Salamat)").check()
            # Note: Text in json is "Public Health (Salamat)" for key "Salamat"

            # Click Apply
            page.get_by_role("button", name="Apply").click()

            page.wait_for_timeout(2000)

            print("Taking screenshot...")
            page.screenshot(path="verification/search_filters.png", full_page=True)
            print("Screenshot saved to verification/search_filters.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_search_filters()
