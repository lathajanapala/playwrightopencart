npm install
npm install -D allure-playwright
@REM npx playwright install-deps
@REM npx playwright codegen
@REM npx playwright test --config=playwright.config.ts
@REM npx playwright test --config=playwright.config.ts --headed
@REM npx playwright test --config=playwright.config.ts --debug
@REM npx playwright test --config=playwright.config.ts --project=chromium
@REM npx playwright test --config=playwright.config.ts --project=firefox
@REM npx playwright test --config=playwright.config.ts --project=webkit
npm install -g allure-commandline --force
npx playwright install

