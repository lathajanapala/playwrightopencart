import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../Test.config';

test('ER-1: empty registration shows all validation messages', async ({ page }) => {
  const cfg = new TestConfig();
  const home = new HomePage(page);
  const reg  = new RegistrationPage(page);

  await test.step('Navigate to Register', async () => {
    await page.goto(cfg.appUrl);
    await home.clickMyAccount();
    await home.clickRegistration();
    await expect(page).toHaveTitle(/Register/);
  });

  await test.step('Submit empty form', async () => {
    await reg.clickContinue();         // do NOT tick privacy checkbox
  });

  await test.step('Validate warning & field errors', async () => {
    await expect(reg.warningPrivacy).toBeVisible();

    await expect(reg.errFirstName).toBeVisible();
    await expect(reg.errLastName).toBeVisible();
    await expect(reg.errEmail).toBeVisible();
    await expect(reg.errTelephone).toBeVisible();
    await expect(reg.errPassword).toBeVisible();
  });
});