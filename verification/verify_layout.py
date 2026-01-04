from playwright.sync_api import sync_playwright
import time

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop View
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000/en", timeout=30000)

            print("Waiting for network idle...")
            page.wait_for_load_state("networkidle")

            print("Taking desktop screenshot...")
            page.screenshot(path="verification/desktop_layout_v2.png", full_page=True)

            # Mobile View
            print("Switching to mobile view...")
            context = browser.new_context(viewport={'width': 375, 'height': 667})
            mobile_page = context.new_page()
            mobile_page.goto("http://localhost:3000/en")
            mobile_page.wait_for_load_state("networkidle")

            print("Taking mobile screenshot (closed menu)...")
            mobile_page.screenshot(path="verification/mobile_layout_closed_v2.png")

            # Open Sheet
            print("Opening mobile menu...")
            mobile_page.get_by_role("button", name="Open menu").click()

            # Wait for animation (Sheet open)
            time.sleep(1) # Wait for animation

            print("Taking mobile screenshot (open menu)...")
            mobile_page.screenshot(path="verification/mobile_layout_open_v2.png")

            print("Verification complete.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_layout()
