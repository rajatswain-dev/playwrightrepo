import { BaseLoginPage } from '../BaseLoginPage';
import { Page, Locator, expect } from '@playwright/test';
export class LoginPage extends BaseLoginPage {
  readonly userName:Locator
  readonly password:Locator
  readonly loginBtn:Locator
  
  constructor(page:Page){
    super(page);
    this.userName=page.locator('[id="user-name"]');
    this.password=page.locator('[id="password"]');
    this.loginBtn=page.locator('[id="login-button"]');
  }

  async login(email: string, password: string):Promise<void>{
    this.userName.fill(email);
    this.password.fill(password);
    this.loginBtn.click();
  }
  

}