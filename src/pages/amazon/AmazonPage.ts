import { BasePage } from "../BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class AmazonPage extends BasePage {
   
    readonly searchBox:Locator;
    readonly amazonLogo:Locator;
    readonly accountsAndList:Locator;
    readonly returnsAndOrder:Locator;
    readonly cartContainer:Locator;
    readonly signIn:Locator;
    readonly signIn1:Locator;


    constructor(page:Page){
        super(page);
        this.searchBox=page.locator('#twotabsearchtextbox');
        this.amazonLogo=page.locator('#nav-logo-sprites');
        this.accountsAndList=page.locator('//span[contains(text(),"Account & Lists")]');
        this.returnsAndOrder=page.locator("#nav-orders");
        this.cartContainer=page.locator("#nav-cart-count-container");
        this.signIn=page.locator("//div[@id='nav-al-container']//span[text()='Sign in']");
        this.signIn1=page.locator("//span[text()='Sign in' and @class='nav-action-inner']")

    }
   async verifyVisibilitySearchBox(){
       await expect(this.searchBox).toBeVisible()
    }
    async verifyVisibilityAmazonLogo(){
        await expect(this.amazonLogo).toBeVisible();
    }
    async verifyVisibilityAccoutsAndList(){
        await expect(this.accountsAndList).toBeVisible();
    }
    async verifyVisibilityReturnsAndOrder(){
        await expect(this.returnsAndOrder).toBeVisible();
    }
    async verifyVisibilityCartButton(){
        await expect(this.cartContainer).toBeVisible();
    }
    async hoverOnAccountAndList(){
        //await this.accountsAndList.waitFor({ state: 'visible' });
        await this.accountsAndList.click();    
    }
    async verifyVisibilityOfSignInBtn(){
        await expect(this.signIn).toBeVisible();
    }

}