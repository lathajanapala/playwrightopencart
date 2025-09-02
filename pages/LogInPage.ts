import{Page,Locator} from '@playwright/test'

export class LogInPage{
    private readonly page:Page;
    private readonly userEmail:Locator;
    private readonly userPassword:Locator;
    private readonly loginBtn:Locator;
    private readonly errormessage:Locator;
    private readonly myAccount:Locator
    private readonly newcustomerContinue:Locator;

    constructor(page:Page){
        this.page=page;
        this.newcustomerContinue = page
      .locator('#content .well')                           // the "well" container
      .filter({ has: page.getByRole('heading', { name: 'New Customer' }) })
      .getByRole('link', { name: /^Continue$/ });
        this.userEmail = page.locator("#input-email");
        this.userPassword = page.locator("#input-password")
        this.loginBtn = page.locator("input.btn.btn-primary")
        this.errormessage = page.locator('#account-login .alert.alert-danger.alert-dismissible')
        .filter({ hasText: 'No match for E-Mail Address and/or Password' });
        this.myAccount = page.locator('h2:has-text("My Account")');


    }
    async setEmail(email:string){
        //await this.userEmail.waitFor({ state: 'visible' });
        await this.userEmail.fill(email);
    }
    async setPassword(password:string){
       // await this.userPassword.waitFor({ state: 'visible' });
        await this.userPassword.fill(password);
    }
    async clickBtn(){
        await this.loginBtn.click();

    }
    async login(email: string, password: string){
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickBtn();
    }
    async newCustomerReg() {
      try {
          await this.newcustomerContinue.click();
      } catch (error) {
        this.page.waitForURL(/route=account\/register/),
          console.error('Error clicking on New Customer Registration button:', error);
      }
  }
    get myAccountHeading(): Locator {
        return this.myAccount;
      }

      async isErrorVisible(timeout = 2000): Promise<boolean> {
        try {
          await this.errormessage.waitFor({ state: 'visible', timeout });
          return true;
        } catch {
          return false;
        }
      }

      async getloginErrorMessage(): Promise<string | null> {
        return this.errormessage.textContent();
      }



}