from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to /en/search...")
            response = page.goto("http://localhost:3000/en/search")
            if response.status != 200:
                print(f"Failed to load page: {response.status}")

            print("Waiting for filters...")
            # Wait for any text that indicates page loaded
            page.wait_for_selector("text=Filters", timeout=10000)

            print("Clicking Cardiology checkbox...")
            # Checkbox ID is spec-Cardiology
            # We click the label associated with it
            # Force click in case of overlay/visibility issues
            page.click("label[for='spec-Cardiology']", force=True)

            # Verify it is checked
            is_checked = page.locator("#spec-Cardiology").is_checked()
            print(f"Checkbox checked: {is_checked}")

            if not is_checked:
                print("Forcing check on input...")
                page.check("#spec-Cardiology", force=True)

            print("Clicking Apply button...")
            # Look for button with text "Apply"
            page.click("button:has-text('Apply')")

            print("Waiting for URL update...")
            # Expect URL to have specialty=Cardiology
            # Wait for navigation
            try:
                page.wait_for_url("**/search?*specialty=Cardiology*", timeout=10000)
                print(f"URL updated successfully: {page.url}")
            except Exception as e:
                print(f"Timeout waiting for URL. Current URL: {page.url}")

            print("Taking screenshot...")
            page.screenshot(path="verification/search_page.png", full_page=True)

        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
