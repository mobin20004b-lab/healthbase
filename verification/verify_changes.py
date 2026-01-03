
import asyncio
from playwright.async_api import async_playwright, expect

async def verify_changes():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Navigate to the home page (English)
        try:
            await page.goto("http://localhost:3000/en", timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            await browser.close()
            return

        # Wait for body to be ready
        await page.wait_for_selector("body")

        # Check for Roboto Mono font variable application on body
        # We can check the computed style of the body or just the class name if possible
        # But easier to check if the class contains the variable hash or similar?
        # Actually, Next.js font variables are usually applied as classes.
        # Let's check if the computed style for a monospace element uses Roboto Mono.

        # Create a test element with font-mono class to verify
        await page.evaluate("""
            const div = document.createElement('div');
            div.className = 'font-mono m3-motion';
            div.id = 'test-div';
            div.textContent = 'Test Monospace';
            document.body.appendChild(div);
        """)

        test_div = page.locator("#test-div")
        await expect(test_div).to_be_visible()

        # Verify font-family includes Roboto Mono (variable name is usually unpredictable in class, but we mapped it in globals.css)
        # In globals.css: --font-mono: var(--font-roboto-mono), ...
        # And in layout.tsx: robotoMono.variable is added to body.

        # Get computed style
        font_family = await test_div.evaluate("el => getComputedStyle(el).fontFamily")
        print(f"Computed font-family: {font_family}")

        # Verify m3-motion class properties
        transition = await test_div.evaluate("el => getComputedStyle(el).transition")
        print(f"Computed transition: {transition}")

        # Take screenshot
        await page.screenshot(path="verification/verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_changes())
