import { Page } from '@playwright/test';
import { BaseLoginPage } from './BaseLoginPage';
import { LoginPage } from './saucedemo/LoginPage';
import { HrmLoginPage } from './hrm/LoginPage';
import { AmazonLoginPage } from './amazon/LoginPage';

export function getLoginPage(environment: string, page: Page): BaseLoginPage {
    switch (environment) {
        case 'saucedemo':
            return new LoginPage(page);
        case 'hrm':
            return new HrmLoginPage(page);
        case 'amazon':
            return new AmazonLoginPage(page);
        default:
            throw new Error(`No login page found for: "${environment}"`);
    }
}