import{test,expect,Locator} from '@playwright/test';
test('Validate loginpage and capture Myaccount', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=common/home");
   await page.locator("a.dropdown-toggle[title ='My Account']").click();
//   await page.getByRole('link',{name:"My Account"}).click()
  await page.locator('ul.dropdown-menu.dropdown-menu-right a:has-text("Login")').click()
//  await page.getByRole('link',{name:"Login"}).first().click();
 await page.getByPlaceholder('E-Mail Address').fill("pushpalatha7@gmail.com");
 await page.getByPlaceholder('Password').fill("123456");
 await page.getByRole('button',{name:"Login"}).click()
 await expect(page.locator("#content").getByRole('heading', { name: 'My Account' })).toBeVisible();
 await page.locator("ul.list-unstyled a:has-text('Edit your account information')").click();
 await expect(page.locator("div#content.col-sm-9 h1:has-text('My Account Information')")).toBeVisible();



})