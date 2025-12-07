import { test, expect } from '@playwright/test';

test.describe('StubIt E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Listen for console logs
    page.on('console', msg => console.log(`[BROWSER]: ${msg.text()}`));
    page.on('pageerror', err => console.log(`[BROWSER ERROR]: ${err}`));
    
    // Ensure frontend is running
    await page.goto('http://localhost:4200');
  });

  test('should load dashboard', async ({ page }) => {
    // Wait for app root
    await page.waitForSelector('app-root');
    
    // Debug: Log content if header missing
    const header = page.locator('header h2');
    if (!await header.isVisible()) {
        console.log('--- PAGE CONTENT ---');
        console.log(await page.content());
        console.log('--------------------');
    }

    await expect(page).toHaveTitle(/StubIt/);
    await expect(header).toContainText('Dashboard');
    // Check for stats cards
    await expect(page.locator('app-dashboard')).toBeVisible();
  });

  test('should create, read, and delete a stub', async ({ page }) => {
    // 1. Navigate to Stubs
    await page.click('a[href="/stubs"]');
    await expect(page).toHaveURL(/.*\/stubs/);
    await expect(page.locator('h1')).toContainText('Stubs');

    // 2. Create Stub
    await page.getByRole('link', { name: 'Create Stub' }).click();
    await expect(page).toHaveURL(/.*\/stubs\/new/);
    
    const uniqueName = `E2E Stub ${Date.now()}`;
    await page.fill('#name', uniqueName);
    await page.selectOption('#method', 'GET');
    await page.fill('#path', `/e2e-test-${Date.now()}`);
    await page.fill('#statusCode', '200');
    await page.fill('#body', '{"message": "success"}');
    
    // Save
    await page.getByRole('button', { name: 'Save Stub' }).click();
    
    // 3. Verify in List (Read)
    await expect(page).toHaveURL(/.*\/stubs/);
    await expect(page.locator('table')).toContainText(uniqueName);

    // 4. Delete (Cleanup) using list action
    // Note: Since we didn't implement a confirmation dialog, it might just fail or needs logic.
    // Assuming button text is 'Delete'
    const row = page.locator('tr', { hasText: uniqueName });
    await row.getByRole('button', { name: 'Delete' }).click();
    
    // Verify removed
    await expect(page.locator('table')).not.toContainText(uniqueName);
  });

  test('should toggle settings', async ({ page }) => {
    await page.click('a[href="/settings"]');
    await expect(page).toHaveTitle(/StubIt/);
    await expect(page.locator('h1')).toContainText('Settings');
    
    const toggle = page.locator('button.rounded-full');
    
    // Check initial state (enabled by default)
    await expect(toggle).toHaveClass(/bg-blue-600/);
    
    // Click to disable
    await toggle.click();
    await expect(toggle).toHaveClass(/bg-slate-700/);
    
    // Click to enable
    await toggle.click();
    await expect(toggle).toHaveClass(/bg-blue-600/);
  });
});
