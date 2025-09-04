// tests/registration.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../Test.config';

test('Register new user via POM (config + faker password)', async ({ page }) => {
  const cfg = new TestConfig();
  const homePage = new HomePage(page);
  const registration = new RegistrationPage(page);

  const password = RandomDataUtil.getPassword();
const userData = {
  firstName: RandomDataUtil.getFirstName(),
  lastName: RandomDataUtil.getLastName(),
  email: RandomDataUtil.getEmail(),
  telephone: RandomDataUtil.getPhoneNumber(),
  password,
  confirm: password,
};

  await test.step('Navigate to Home', async () => {
    await page.goto(cfg.appUrl);
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  await test.step('Open My Account → Register', async () => {
    await homePage.clickMyAccount();
    await homePage.clickRegistration();
  });

  await test.step('Complete Registration Form', async () => {
    // Your Registration.completeRegistration() already fills confirm = password
    await registration.completeRegistration(userData);
    await page.screenshot({ path: 'screenshots/registration_form_filled1.png', fullPage: true });
    await expect(page).toHaveTitle(/Your Account Has Been Created!/i);
    await expect(page.locator('h1')).toHaveText(/Your Account Has Been Created!/i);
  });

  await test.step('Validate confirmation', async () => {
    const confirmationText = (await registration.confirmationMessage())?.trim() ?? '';
    console.log('Confirmation:', confirmationText);
    expect(confirmationText).toContain('Your Account Has Been Created!');
    await expect(page).toHaveURL(/account\/success|route=account\/success/i);
  });
});

