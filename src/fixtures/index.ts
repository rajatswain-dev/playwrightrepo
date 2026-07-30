import { test as base, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TodoPage } from '../pages/TodoPage';

// Define custom fixture types
type PageFixtures = {
  loginPage: LoginPage;
  todoPage: TodoPage;
  authenticatedContext: BrowserContext;
  authenticatedPage: Page;
};

// Extend Playwright's base test with custom fixtures
export const test = base.extend<PageFixtures>({
  // Page Object fixtures - auto-initialized per test
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  todoPage: async ({ page }, use) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await use(todo);
  },

  // Pre-authenticated context using saved storage state
  authenticatedContext: async ({ browser }, use) => {
    let context: BrowserContext;
    try {
      // Try to load saved auth state
      context = await browser.newContext({
        storageState: 'auth.json',
      });
    } catch {
      // Fall back to a fresh context if auth.json doesn't exist
      context = await browser.newContext();
    }
    await use(context);
    await context.close();
  },

  // Pre-authenticated page
  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    await use(page);
    await page.close();
  },
});

export { expect } from '@playwright/test';
