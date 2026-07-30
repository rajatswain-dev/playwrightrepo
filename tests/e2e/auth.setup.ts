import { test as setup } from '@playwright/test';

/**
 * Auth Setup: Saves authenticated session to auth.json
 * This runs before tests that depend on it via the 'setup' project dependency.
 *
 * Uncomment and adapt the login steps for your application.
 */
setup('authenticate', async ({ page }) => {
  // Navigate to login page
  // await page.goto('/login');

  // Fill in credentials
  // await page.getByLabel('Email').fill(process.env.ADMIN_EMAIL || 'admin@test.com');
  // await page.getByLabel('Password').fill(process.env.ADMIN_PASSWORD || 'Admin@123');
  // await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for successful login
  // await page.waitForURL('**/dashboard');

  // Save authenticated state
  await page.context().storageState({ path: 'auth.json' });
  console.log('✅ Auth state saved.');
});
