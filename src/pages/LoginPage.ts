import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: /sign in|log in|login/i });
    this.errorMessage = page.getByTestId('error-message');
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.rememberMeCheckbox = page.getByLabel(/remember me/i);
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginAndWait(email: string, password: string): Promise<void> {
    await this.login(email, password);
    await this.waitForPageLoad();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectEmailValidationError(): Promise<void> {
    const emailField = this.emailInput;
    await expect(emailField).toHaveAttribute('aria-invalid', 'true');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async checkRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }
}
