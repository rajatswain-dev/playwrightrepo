import { chromium, FullConfig } from '@playwright/test';

/**
 * Global Setup: Runs once before all tests.
 * Used to perform authentication and save session state.
 */
async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL = config.projects[0]?.use?.baseURL || 'https://demo.playwright.dev/todomvc';
  const browser = await chromium.launch({ headless: false , channel: 'chrome'});
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  try {
    console.log('🔧 Running global setup...');

    // --- Uncomment and customize for your app's login ---
    // await page.goto('/login');
    // await page.getByLabel('Email').fill(process.env.ADMIN_EMAIL || 'admin@test.com');
    // await page.getByLabel('Password').fill(process.env.ADMIN_PASSWORD || 'Admin@123');
    // await page.getByRole('button', { name: 'Sign in' }).click();
    // await page.waitForURL('**/dashboard');

    // Save auth state for reuse across tests
    await context.storageState({ path: 'auth.json' });
    console.log('✅ Auth state saved to auth.json');
  } catch (error) {
    console.warn('⚠️  Global setup skipped (no login page found). Using empty auth state.');
    // Create empty auth state so tests don't fail
    await context.storageState({ path: 'auth.json' });
  } finally {
    await browser.close();
  }
}

export default globalSetup;
