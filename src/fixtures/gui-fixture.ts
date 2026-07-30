import { test as base, BrowserContext, Page } from '@playwright/test';
import { getEnvironmentConfig, getCurrentEnvironment } from '../lib/env-config';
import { getLoginPage } from '../pages/LoginFactory';
import { LoginPage } from '../pages/saucedemo/LoginPage';

type PageFixtures = {
    loginPage: LoginPage;
    authenticatedPage: Page;
    authenticatedContext: BrowserContext;
};

export const test = base.extend<PageFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    authenticatedContext: async ({ browser }, use) => {
        let context: BrowserContext;
        try {
            context = await browser.newContext({
                storageState: 'auth.json',
            });
        } catch {
            context = await browser.newContext();
        }
        await use(context);
        await context.close();
    },

    authenticatedPage: async ({ page }, use) => {
        const environment = getCurrentEnvironment();
        const { url, requiresLogin, credentials } = getEnvironmentConfig(environment);

        console.log(`Environment : ${environment}`);
        console.log(`URL         : ${url}`);
        console.log(`Needs Login : ${requiresLogin}`);
        console.log('USERNAME     :', credentials?.username);
        console.log('PASSWORD     :', credentials?.password);

        await page.goto(url);

        if (requiresLogin && credentials) {
            const loginPage = getLoginPage(environment, page);
            await loginPage.login(credentials.username!, credentials.password!);
            console.log(`✅ Logged into ${environment}`);
        } else {
            console.log(`⏭️ No login required for ${environment}`);
        }

        await use(page);
    },

});

export { expect } from '@playwright/test';