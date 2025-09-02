import { Page, Locator } from '@playwright/test'
import { title } from 'process';
export class HomePage {
    private readonly page: Page;
    private readonly linkMyAccount: Locator;
    private readonly linkRegister: Locator;
    private readonly linkLogIn: Locator;
    private readonly textSearchBox: Locator;
    private readonly btnSearch: Locator;


    constructor(page: Page) {
        this.page = page;
        this.linkMyAccount = page.locator("span:has-text('My Account')")
        // this.linkRegister = page.getByRole('link', { name: 'Register' });
        this.linkRegister = page.locator('#top-links a:has-text("Register")');
        this.linkLogIn = page.locator('#top-links a:has-text("Login")');
        // this.newcustomerBtn =page.locator('div.well a.btn.btn-primary')
        this.textSearchBox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('.fa.fa-search');

    }
    //Action methods
    async isHomePageExists() {
        let title: string = await this.page.title();
        if (title) {
            return true;
        }
        return false;

    }
    async clickMyAccount() {
        try {
            await this.linkMyAccount.click();
        } catch (error) {
            console.error('Error clicking on My Account link:', error);
        }

    }
    async clickRegistration() {
        try {
            await this.linkRegister.click();
        } catch (error) {
            console.error('Error clicking on Register link:', error);
        }


    }
    async clickLogIn() {
        try {
            await this.linkLogIn.click();
        } catch (error) {
            console.error('Error clicking on Login link:', error);
        }

    }

    async enterProductName(pName: string) {
        try {
            await this.textSearchBox.fill(pName);
        } catch (error) {
            console.error('Error entering product name in the search box:', error);
        }
    }
    async clickSearchBtn() {
        try {
            await this.btnSearch.click();
        } catch (error) {
            console.error('Error clicking on Search button:', error);
        }
    }




}


