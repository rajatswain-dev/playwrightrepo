import { BasePage } from "../BasePage";
import { Page,Locator,expect } from "@playwright/test";

export class HomePage extends BasePage
{
    readonly pageheader:Locator;

    constructor(page:Page){
        super(page)
        this.pageheader=page.getByText('Swag Labs');
    }
    async verifyPageHeader(){
        await expect(this.pageheader).toBeVisible();
    }
}