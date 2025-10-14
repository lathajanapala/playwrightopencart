import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LogInPage } from '../pages/LogInPage';
import { Dataprovider } from '../utils/dataProvider';
import path from 'path';

// Define type for login data
type LoginData = {
  testName: string;
  email: string;
  password: string;
  expected: string;
};

// Load test data from JSON
const loginData: LoginData[] = Dataprovider.getTestDataFromJson<LoginData[]>(
  path.join(__dirname, '../testdata/logindata.json')
);

test.describe('Data-driven Login Tests', () => {
  for (const data of loginData) {
    test(`${data.testName}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LogInPage(page);

      // Navigate to AUT
      await page.goto('https://naveenautomationlabs.com/opencart/');

      // Navigate to Login page
      await homePage.clickMyAccount();
      await homePage.clickLogIn();

      // Perform login
      await loginPage.login(data.email, data.password);

      // Assertions
      if (data.expected === 'success') {
        await expect(loginPage.myAccountHeading).toBeVisible();
      } else {
        const isErrorShown = await loginPage.isErrorVisible();
        expect(isErrorShown).toBeTruthy();

        const errorText = await loginPage.getloginErrorMessage();
        expect(errorText).toContain(
          'No match for E-Mail Address and/or Password'
        );
      }
    });
  }
});
