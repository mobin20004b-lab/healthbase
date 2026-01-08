from playwright.sync_api import Page, expect, sync_playwright
import time

def test_search_page_functionality(page: Page):
    """
    Verifies the Search Page layout, filters, and mobile map toggle.
    """

    # 1. Arrange: Go to the search page.
    print("Navigating to search page...")
    page.goto("http://localhost:3000/en/search")

    # 2. Act & Assert: Check Desktop Layout
    print("Verifying desktop layout...")
    expect(page.get_by_role("heading", name="Find Your Care")).to_be_visible()

    # Verify Filters Sidebar is present (desktop)
    # Looking for a key element in the sidebar
    # "Location" might appear in multiple places, use a more specific selector or first()
    expect(page.locator("label").filter(has_text="Location")).to_be_visible()
    expect(page.locator("label").filter(has_text="Specialty")).to_be_visible()

    # Verify Clinic Cards are present
    expect(page.get_by_text("Tehran Heart Center")).to_be_visible()

    # Verify Map Placeholder
    expect(page.get_by_text("Interactive Map")).to_be_visible()

    # Screenshot Desktop
    page.screenshot(path="verification/search_desktop.png")
    print("Desktop screenshot taken.")

    # 3. Mobile View Verification
    print("Verifying mobile layout...")
    page.set_viewport_size({"width": 375, "height": 667})
    time.sleep(1) # wait for resize

    # Filters should be hidden (in sheet)
    # The Location text should NOT be visible directly (it's inside the closed sheet)
    # Wait, the DOM might still have it but hidden?
    # Tailwind hidden class means display: none, so toBeVisible() should fail or pass with .not
    # However, depending on implementation it might be in DOM.
    # Let's check for the FAB instead which is mobile only.

    fab = page.locator("button.rounded-2xl.shadow-xl")
    expect(fab).to_be_visible()

    # List should be visible
    expect(page.get_by_text("Tehran Heart Center")).to_be_visible()

    # Map should be hidden (or covered)
    # With the toggle logic: showMap ? "block" : "hidden lg:block"
    # Initially showMap is false -> hidden on mobile
    expect(page.get_by_text("Interactive Map")).not_to_be_visible()

    # 4. Interact: Toggle Map
    print("Toggling map...")
    fab.click()
    time.sleep(0.5)

    # Map should be visible now
    expect(page.get_by_text("Interactive Map")).to_be_visible()

    # List should be hidden
    expect(page.get_by_text("Tehran Heart Center")).not_to_be_visible()

    # Screenshot Mobile Map
    page.screenshot(path="verification/search_mobile_map.png")
    print("Mobile Map screenshot taken.")

    # 5. Interact: Toggle Filters (Mobile)
    # Toggle back to list first
    fab.click()
    time.sleep(0.5)

    print("Opening mobile filters...")
    # Find the filter button (Filters with icon)
    page.get_by_role("button", name="Filters").click()
    time.sleep(0.5)

    # Now filters should be visible in the sheet
    # The custom Sheet component does NOT use role="dialog" by default unless we add it or use a library.
    # It renders a div with fixed z-50 ...
    # Let's search for "Location" again, but this time it should be visible (on mobile).
    # Since we are on mobile, only the sheet one would be visible if open.
    # The desktop sidebar is hidden via CSS class "hidden lg:block".

    # Wait for animation
    time.sleep(1)

    # Expect the label "Location" to be visible
    # We might have 2 "Location" labels in DOM (one hidden sidebar, one visible sheet),
    # OR if Sheet content is conditionally rendered or always there?
    # SheetContent implementation: if (!open) return null;
    # So if open, it is in DOM.

    # We should have 2 elements now?
    # 1. Sidebar (hidden via CSS)
    # 2. Sheet (visible)

    # Playwright's to_be_visible() checks if it's visible to user.
    # So filtering by visible=True should find the one in the sheet.

    # "first" might pick the hidden one (sidebar).
    # We want the one that IS visible.

    # We can filter by visibility using CSS selector not directly supported easily in standard chain unless we iterate.
    # OR we can assume the Sheet is the last one inserted in DOM (portal).
    expect(page.locator("label").filter(has_text="Location").last).to_be_visible()

    # Screenshot Mobile Filters
    page.screenshot(path="verification/search_mobile_filters.png")
    print("Mobile Filters screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        try:
            test_search_page_functionality(page)
            print("Verification Successful!")
        except Exception as e:
            print(f"Verification Failed: {e}")
            page.screenshot(path="verification/failure.png")
        finally:
            browser.close()
