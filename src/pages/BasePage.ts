import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async clickWithRetry(locator: Locator, retries = 3): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        await locator.click({ timeout: 5000 });
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async expectURL(urlOrPattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlOrPattern);
  }

  async expectTitle(titleOrPattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(titleOrPattern);
  }
}
