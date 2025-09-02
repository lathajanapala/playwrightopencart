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
  confirm: RandomDataUtil.getwrongConfirmPassword(),
};

  await test.step('Navigate to Home', async () => {
    await page.goto(cfg.appUrl);
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  await test.step('Open My Account → Register', async () => {
    await homePage.clickMyAccount();
    await homePage.clickRegistration();
  });

  await test.step('Fill and submit with mismatched confirm', async () => {
    // Your Registration.completeRegistration() already fills confirm = password
    await registration.completeRegistration(userData);
    await page.screenshot({ path: 'screenshots/registration_form_filled1.png', fullPage: true });
  });
//   await test.step('Assert password mismatch error', async () => {
//     // Still on register page, not success
//    // await expect(page).toHaveURL(/route=account\/register/);
//     await expect(page.getByRole('heading', { name: /Register Account/i })).toBeVisible();

    // Error text near confirm field
    await expect(registration.errConfirmMismatch).toBeVisible();
    // Optional generic alert assertion if theme shows one:
    // await expect(page.locator('.alert-danger')).toContainText(/password.*does not match/i);
  });



