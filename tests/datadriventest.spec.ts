import { test, expect } from '@playwright/test';
import { LogInPage } from '../pages/LogInPage';
import { HomePage } from '../pages/HomePage';

// Test data
const loginData = [
  {
    testName: "Valid login",
    email: "pushpalatha7@gmail.com",
    password: "123456",
    expected: "success"
  },
  {
    testName: "Invalid login",
    email: "abcxyz@xyz.com",
    password: "abcxyx",
    expected: "failure"
  }
];

test.describe('Login Tests - Data Driven', () => {

  for (const data of loginData) {
    test(`${data.testName}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LogInPage(page);

      // Navigate to home
      await page.goto('https://naveenautomationlabs.com/opencart/');   
      // Go to login page
      await homePage.clickMyAccount();
      await homePage.clickLogIn();

      // Perform login
      await loginPage.login(data.email, data.password);

      if (data.expected === "success") {
        // Validate login success
        await expect(loginPage.myAccountHeading).toBeVisible();
      } else {
        // Validate login failure
        const isErrorShown = await loginPage.isErrorVisible();
        expect(isErrorShown).toBeTruthy();

        const errorText = await loginPage.getloginErrorMessage();
        expect(errorText).toContain("No match for E-Mail Address and/or Password");
      }
    });
  }
});