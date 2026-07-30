import { test, expect } from '../../../src/fixtures/gui-fixture';
import { AutomationPractise } from '../../../src/pages/automationpractice/AutomationPractise';


test.describe('class 19 and day 17', () => {
    let aup: AutomationPractise;
    test.beforeEach(async ({ authenticatedPage }) => {
        aup = new AutomationPractise(authenticatedPage);
    })

    test('browser navigation method', async ({ authenticatedPage }) => {
        await authenticatedPage.waitForTimeout(5000);
        await authenticatedPage.goBack();
        await authenticatedPage.waitForTimeout(5000);
        await authenticatedPage.goForward();
        await authenticatedPage.waitForTimeout(5000);
        await authenticatedPage.reload();
        let pageTitle = await authenticatedPage.title();
        let currentPageUrl = await authenticatedPage.url();
        console.log(pageTitle);
        console.log(currentPageUrl);

    })
    test('unserstanding fill', async ({ authenticatedPage }) => {
        await aup.enterNameUsingFill("Rajat")
        await authenticatedPage.waitForTimeout(3000);
        await aup.enterNameUsingFill("pupul")

    })
    test('unsernding type', async ({ authenticatedPage }) => {
        await aup.enterNameUsingType("Rajat")
        await authenticatedPage.waitForTimeout(3000);

        await aup.enterNameUsingType("kumar")

    })
    test('unsernding fill and type', async ({ authenticatedPage }) => {
        await aup.enterNameUsingFill("Rajat")
        await authenticatedPage.waitForTimeout(3000);
        aup.clickRedioBtm();
        aup.checkSunday()
        await authenticatedPage.waitForTimeout(3000);
        aup.uncheckSunday()



    })
    test('under standing other method of page interaction', async ({ authenticatedPage }) => {
        await aup.enterNameUsingFill("Rajat")
        await authenticatedPage.waitForTimeout(3000);
        aup.clickRedioBtm();
        aup.checkSunday()
        await authenticatedPage.waitForTimeout(3000);
        aup.uncheckSunday()
        aup.scroll();
        aup.selectDropdownOption("india");
        aup.selectDropdownValue("France");
        await authenticatedPage.waitForTimeout(1000);
        aup.selectDropdownByIndex(2);
        await authenticatedPage.waitForTimeout(1000);
        aup.multiSelectDropdown(["Red", "Blue"])
        await authenticatedPage.waitForTimeout(1000);
        aup.multiSelectDropdownByOption(["blue", "green"])
        await authenticatedPage.waitForTimeout(1000);
        aup.multiSelectDropdownByIndex([3, 4])
    })
    test('file upload', async ({ authenticatedPage }) => {
        const path: string = "C:\\Users\\Abcom\\Downloads\\1780623417685.pdf";
        const value: string[] = ["CIAM.docx", "Time.xlsx"];
        aup.singleFileUpload(path)
        await authenticatedPage.waitForTimeout(3000);
        aup.selectMultipulFileAndUpload(value)


    })
    test('mouse interaction', async ({ authenticatedPage }) => {
        aup.mouseHoverOnPointMe();
        await authenticatedPage.waitForTimeout(3000);
        aup.doubleClickCopyText();
        await authenticatedPage.waitForTimeout(3000);
        aup.rightClickOnCopyText()
    })
    test('mouse interaction1', async ({ authenticatedPage }) => {
        aup.mouseHoverOnPointMe();
        await authenticatedPage.waitForTimeout(3000);
        aup.doubleClickCopyText();
        await authenticatedPage.waitForTimeout(3000);
        aup.rightClickOnCopyText()
    })
    test('mouse interaction-drag and drop', async ({ authenticatedPage }) => {
        aup.dragAndDropElement();
        await authenticatedPage.waitForTimeout(1000);
        aup.dragAndDropElement1();
        await authenticatedPage.waitForTimeout(1000);
    })
    test("keyboard interaction", async ({ authenticatedPage }) => {
         aup.copyPesteTheValue("Rajat")
         await authenticatedPage.waitForTimeout(1000);
         const text = await aup.alertText();
         console.log(text)


    })



})