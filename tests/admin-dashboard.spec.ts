import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
    // Note: To test actual Admin access, we'd need a seeded admin user.
    // For MVP verification, we check route protection and login page existence.

    test('should redirect unauthenticated users to login', async ({ page }) => {
        await page.goto('http://localhost:3000/en/admin');
        // Expect to be redirected to login page (default NextAuth behavior or our middleware)
        // Our middleware/auth.config redirects to /auth/login
        await expect(page).toHaveURL(/\/auth\/login/);
    });

    test('should show login page content', async ({ page }) => {
        await page.goto('http://localhost:3000/en/auth/login');
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    // To test actual Admin access, we'd need a seeded admin user.
    // I will add a test case that "attempts" to login as admin and checks for dashboard elements
    // assuming the seed data MIGHT be there or we can mock the response if we were using mocks.
    // Given the constraints, I will stick to testing the protection and login form existence.
});
