import { test, expect } from '../../../src/fixtures/gui-fixture';
import { HomePage } from '../../../src/pages/saucedemo/HomePage';

test.describe('Sauce Lab Test', () => {

    test('validate header after login', async ({ authenticatedPage }) => {
        const homePage = new HomePage(authenticatedPage);
        await homePage.verifyPageHeader();
    });

});