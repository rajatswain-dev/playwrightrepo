import { Page, Locator } from '@playwright/test';
import { BaseLoginPage } from '../BaseLoginPage';

export class AmazonLoginPage extends BaseLoginPage {
    readonly accountsAndList: Locator
    readonly accountsAndListArrowMark: Locator
    readonly dealsOftheDay: Locator
    readonly addToCart: Locator
    readonly colorChange: Locator
    readonly enterEmail: Locator
    readonly password: Locator
    readonly signInBtn: Locator
    readonly continueBtn: Locator
    readonly continueShopping: Locator
    
    private authenticatorId?: string; // 👈 add this field

    constructor(page: Page) {
        super(page);
        this.accountsAndList = page.getByText('Account & Lists');
        this.accountsAndListArrowMark = page.getByLabel('Expand Account and Lists');
        this.dealsOftheDay = page.getByTestId("player");
        this.addToCart = page.locator("//span[contains(text(),'iPhone Air 256 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Light Gold')]/ancestor::div[@class='a-section a-spacing-small a-spacing-top-small']//button[@name='submit.addToCart']")
        this.colorChange = page.locator("//span[contains(text(),'Galaxy S26 Ultra 5G (Cobalt Violet, 12GB RAM, 256GB Storage) with Built-in Privacy Display, AI Phone, Photo Assist, Creative Studio, 200MP Camera, 5000mAh Battery and Snapdragon 8 Elite Gen 5')]/ancestor::div[@class='a-section a-spacing-small a-spacing-top-small']//a[@aria-label='Black']")
        this.enterEmail = page.locator("#ap_email_login");
        this.password = page.locator("#ap_password");
        this.signInBtn = page.locator("#signInSubmit")
        this.continueBtn = page.locator('[aria-labelledby="continue-announce"]');
        this.continueShopping = page.locator("//button[text()='Continue shopping']");


    }

    async disablePasskeyPrompt(): Promise<string> {
        const client = await this.page.context().newCDPSession(this.page);
        await client.send('WebAuthn.enable');
        const { authenticatorId } = await client.send('WebAuthn.addVirtualAuthenticator', {
            options: {
                protocol: 'ctap2',
                transport: 'internal',
                hasResidentKey: true,
                hasUserVerification: true,
                isUserVerified: true,
                automaticPresenceSimulation: true,
            },
        });
        return authenticatorId;
    }

    async login(username: string, password: string): Promise<void> {
        await this.disablePasskeyPrompt();
        await this.continueShopping.click();
        await this.accountsAndList.click();
        this.page.waitForTimeout(1000)
        await this.enterEmail.fill(username);
        await this.continueBtn.click()
        await this.password.fill(password);
        await this.signInBtn.click();
    }
}