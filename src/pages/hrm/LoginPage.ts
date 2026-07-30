import { Page, Locator } from '@playwright/test';
import { BaseLoginPage } from '../BaseLoginPage';

export class HrmLoginPage extends BaseLoginPage {
    readonly userName: Locator
    readonly password: Locator
    readonly loginBtn: Locator
    constructor(page: Page) {
        super(page);
        this.userName = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginBtn = page.locator('button[type="submit"]');

    }

    async login(username: string, password: string): Promise<void> {
        this.userName.fill(username);
        this.password.fill(password);
        this.loginBtn.click();
    }
}