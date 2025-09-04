import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  testDir: './tests',
  fullyParallel: true,
  // workers: 5,
  retries: 1,
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright'] // make sure: npm i -D allure-playwright
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    // launchOptions: {
    //   // slowMo: 50 // Adjust the value (in milliseconds) as needed
    // }
  },
  // grep: /@master/,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ],
});