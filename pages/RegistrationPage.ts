import { Page,expect, Locator } from '@playwright/test'
export class RegistrationPage{
    private readonly page:Page;
    private readonly sidebarRegisterLink: Locator;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly email:Locator;
    private readonly telephone:Locator;
    private readonly password:Locator;
    private readonly confirmPassword:Locator;
    private readonly subsciptionRadioYes:Locator;
    private readonly suscriptionRadioNo:Locator;
    private readonly privacyPolicyCheckBox:Locator;
    private readonly continueBtn:Locator;
    private readonly confirmMessage:Locator;
    readonly form: Locator;
    readonly warningPrivacy: Locator;
    readonly errFirstName: Locator;
    readonly errLastName: Locator;
    readonly errEmail: Locator;
    readonly errTelephone: Locator;
    readonly errPassword: Locator;
    readonly errConfirmMismatch:Locator;
    constructor(page: Page) {
        this.page = page;

        // Form scope
        this.form = page.locator('#account-register, #content form');
        this.sidebarRegisterLink = page.locator('#column-right').getByRole('link', { name: 'Register' });

        // Input fields
        this.firstName = page.locator("#input-firstname");
        this.lastName = page.locator("#input-lastname");
        this.email = page.locator("#input-email");
        this.telephone = page.locator("#input-telephone");
        this.password = page.locator("#input-password");
        this.confirmPassword = page.locator("#input-confirm");

        // Radios / checkbox / buttons
        this.subsciptionRadioYes = page.getByRole('radio', { name: 'Yes' });
        this.suscriptionRadioNo = page.getByRole('radio', { name: 'No' });
        this.privacyPolicyCheckBox = page.getByRole('checkbox');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.confirmMessage = page.locator("h1:has-text('Your Account Has Been Created!')");

        // Error messages
        this.warningPrivacy = page.locator('.alert.alert-danger').filter({ hasText: 'You must agree to the Privacy Policy' });
        this.errFirstName = this.form.getByText('First Name must be between 1 and 32 characters!', { exact: true });
        this.errLastName = this.form.getByText('Last Name must be between 1 and 32 characters!', { exact: true });
        this.errEmail = this.form.getByText('E-Mail Address does not appear to be valid!', { exact: true });
        this.errTelephone = this.form.getByText('Telephone must be between 3 and 32 characters!', { exact: true });
        this.errPassword = this.form.getByText('Password must be between 4 and 20 characters!', { exact: true });
        this.errConfirmMismatch = this.form.locator('.text-danger').filter({
            hasText: /Password confirmation.*does not match/i
          });
    }
    // write methods for each action
    async clickSidebarRegister() {
        await this.sidebarRegisterLink.click();
      }
    async setFirstName(fname: string): Promise<void> {
        await this.firstName.fill(fname);
    }
    async setLastName(lname: string): Promise<void> {
        await this.lastName.fill(lname);
    }
    async setEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }
    async setTelephoneNumber(tel: string): Promise<void> {
        await this.telephone.fill(tel);
    }
    async setPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }
    async setConfirmPassword(confirm: string): Promise<void> {
        await this.confirmPassword.fill(confirm);
    }

    async setPrivacypolicy(): Promise<void> {
        await this.privacyPolicyCheckBox.click();
    }
    async clickContinue(): Promise<void> {
        await this.continueBtn.click();
    }
    async confirmationMessage(): Promise<string | null> {
        return await this.confirmMessage.textContent();
    }

    async setSubscriptionRadioYes(){
        await this.subsciptionRadioYes.click();
    }

async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
        confirm:string
    }): Promise<void> {
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephoneNumber(userData.telephone);
        await this.setPassword(userData.password);
        // const confirmValue = userData.confirm ?? userData.password;
        // await this.setConfirmPassword(confirmValue);
        await this.setConfirmPassword(userData.confirm);
        await this.setPrivacypolicy();
        await this.page.screenshot({
            path: 'screenshots/registration_form_filled.png',
            fullPage: true
        });
        await this.clickContinue();


    }

}