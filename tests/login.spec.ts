// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LogInPage } from '../pages/LogInPage';
import { TestConfig } from '../Test.config';

test('Login: capture My Account on success OR error message on failure', async ({ page }) => {
  const cfg = new TestConfig();
  const home = new HomePage(page);

  // Go to site and open the Login page via UI
  await page.goto(cfg.appUrl);
  await home.clickMyAccount();
  await home.clickLogIn();

  const login = new LogInPage(page);
  await login.login(cfg.email, cfg.password);

  // Check for error quickly; if not found, assert success path
  if (await login.isErrorVisible(3000)) {
    const errorText = (await login.getloginErrorMessage())?.trim() ?? '';
    console.log('Login failed with error:', errorText);
    expect(errorText).toContain('No match for E-Mail Address and/or Password');
  } else {
    await expect(login.myAccountHeading).toBeVisible();
    const accountText = (await login.myAccountHeading.textContent())?.trim() ?? '';
    console.log('Login succeeded, heading:', accountText);
    expect(accountText).toContain('My Account');
    // Optional stronger check:
    // await expect(page).toHaveURL(/route=account\/account/);
  }
});
