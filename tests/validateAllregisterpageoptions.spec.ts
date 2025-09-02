import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LogInPage } from '../pages/LogInPage';   // <- add this
import { TestConfig } from '../Test.config';

test('validate all Register entry points', async ({ page }) => {
  const cfg = new TestConfig();
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);
  const login = new LogInPage(page);              // <- instantiate

  const assertOnRegister = async () => {
    // await expect(page).toHaveURL(/route=account\/register/);
    await expect(page).toHaveTitle(/Register Account/i);
    await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
  };

  // 1) Home → My Account → Register
await test.step('Home → My Account → Register', async () => {
    await page.goto(cfg.appUrl);
    expect(await home.isHomePageExists()).toBeTruthy();
    await home.clickMyAccount();
    await home.clickRegistration();
    await assertOnRegister();

    // Take a screenshot and name it registrationpage
    await page.screenshot({ path: 'registrationpage.png', fullPage: true });
});

  // reset
  await page.goto(cfg.appUrl);

  // 2) My Account → Login → New Customer: Continue
await test.step('My Account → Login → New Customer Continue', async () => {
    await home.clickMyAccount();
    await home.clickLogIn();
    await expect(page).toHaveTitle(/Account Login/i);
    await expect(page.getByRole('heading', { name: 'New Customer' })).toBeVisible();

    await login.newCustomerReg();  // <- actually clicks “Continue” and waits
    await assertOnRegister();

    // Take a screenshot and name it newcustomer
    await page.screenshot({ path: 'newcustomer.png', fullPage: true });
});


  // reset
  await page.goto(cfg.appUrl);

  // 3) My Account → Login → Right Column Register
await test.step('My Account → Login → Right Column Register', async () => {
    await home.clickMyAccount();
    await home.clickLogIn();
    await registration.clickSidebarRegister(); // '#column-right' link
    await assertOnRegister();

    // Take a screenshot and name it sidebarregister
    await page.screenshot({ path: 'sidebarregister.png', fullPage: true });
});
  });

