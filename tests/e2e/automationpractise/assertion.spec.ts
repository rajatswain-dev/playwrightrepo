import { test, expect } from '../../../src/fixtures/gui-fixture';
import { AutomationPractise } from '../../../src/pages/automationpractice/AutomationPractise';

test.describe('assertion',()=>{
  let aup: AutomationPractise;
    test.beforeEach(async ({ authenticatedPage }) => {
        aup = new AutomationPractise(authenticatedPage);
    })
    test('validate page title',async({ authenticatedPage })=>{
      await expect(await authenticatedPage.title()).toBe('Automation Testing Practice');
      await expect(authenticatedPage).toHaveTitle('Automation Testing Practice');

    })
     test('validate page url',async({ authenticatedPage })=>{
      await expect(await authenticatedPage.url()).toBe('https://testautomationpractice.blogspot.com/');
      await expect(authenticatedPage).toHaveURL('https://testautomationpractice.blogspot.com/');
    })
    
     test('validating text',async({ authenticatedPage })=>{
      const actual=await aup.automationTextContent();
      await expect(actual?.trim()).toBe('Automation Testing Practice');
      await expect(actual?.trim()).toContain('Automation Testing Practice');
      aup.verifyTextContentOnWeb()
    })
    

})

