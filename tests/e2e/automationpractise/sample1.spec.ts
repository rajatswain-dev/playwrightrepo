import { promises } from 'dns';
import { test, expect } from '../../../src/fixtures/gui-fixture';
import { AutomationPractise } from '../../../src/pages/automationpractice/AutomationPractise';

test.describe('', () => {
    let aup: AutomationPractise;
    test.beforeEach(async ({ authenticatedPage }) => {
        aup = new AutomationPractise(authenticatedPage);
    })
    test('sample alert', async ({ authenticatedPage }) => {
        authenticatedPage.on('dialog', async (dialog) => {
            await authenticatedPage.waitForTimeout(1000);
            console.log(await dialog.message());
            await dialog.accept();
        })
        await aup.clickOnSimplealert();
    })
    test('conformation alert', async ({ authenticatedPage }) => {
        authenticatedPage.on('dialog', async (dialog) => {
            await authenticatedPage.waitForTimeout(1000);
            console.log(await dialog.message());
            await dialog.dismiss();
        })
        await aup.clickOnconformationAlert();
    })
    test('prompt alert', async ({ authenticatedPage }) => {
        authenticatedPage.on('dialog', async (dialog) => {
            await authenticatedPage.waitForTimeout(2000);
            console.log(await dialog.message());
            await dialog.accept("rajat");
        })
        await authenticatedPage.waitForTimeout(1000);
        await aup.clickOnPromptAlert();

    })
    test('new tab', async ({ authenticatedPage }) => {
        const [newPage] = await Promise.all([
            authenticatedPage.waitForEvent('popup'),
            aup.clickOnNewTab()

        ]);
        const aup1 = new AutomationPractise(newPage);
        await aup1.enterTextInChildSearchBox("rajat")
        await authenticatedPage.waitForTimeout(2000);
        await authenticatedPage.bringToFront();

        await aup.enterNameUsingFill("Rajat")


    })
    test('context ', async ({ authenticatedContext }) => {
        const page1 = await authenticatedContext.newPage();
        const page2 = await authenticatedContext.newPage();
        await page1.goto("https://www.saucedemo.com/");
        await page2.goto("https://www.amazon.in/");

    })
    test('new window ', async ({ authenticatedPage }) => {
        const [newwindow] = await Promise.all([
            authenticatedPage.waitForEvent('popup'),
            aup.clickOnNewwindow()
        ]);
        await authenticatedPage.waitForTimeout(2000);
        const aup1 = new AutomationPractise(newwindow);
        await aup1.clickOnMoreInfoLink();

    })
    test('new window other method  day 23', async ({ authenticatedPage }) => {
        const popupPromise=authenticatedPage.waitForEvent('popup')
        await  aup.clickOnNewwindow()
        const childPage=await popupPromise;
        await authenticatedPage.waitForTimeout(2000);

        const aup1 = new AutomationPractise(childPage);
        await aup1.clickOnMoreInfoLink();
    })

})