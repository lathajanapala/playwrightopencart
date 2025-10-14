import { test, expect, Page } from '@playwright/test';

test('iterate dynamic table, open new window, verify and click button', async ({ page, context }) => {
  // Go to page with dynamic table
  await page.goto('https://example.com/dynamic-table');

  // Locate all rows
  const rows = page.locator('table#myTable tbody tr');
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    // Get handle to the row
    const row = rows.nth(i);

    // Wait for the new page to open after click
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // capture new tab
      row.locator('a.view-details').click() // link in the row opens new window
    ]);

    await newPage.waitForLoadState('domcontentloaded');

    // Check for the button with text 'John' in the new page
    const johnButton = newPage.locator('button:has-text("John")');

    if (await johnButton.isVisible()) {
      console.log(`Row ${i + 1}: Found button with John — clicking it`);
      await johnButton.click();
      // You can also add assertions
      await expect(johnButton).toBeVisible();
    } else {
      console.log(`Row ${i + 1}: No button with John found`);
    }

    // Close the new page or go back as needed
    await newPage.close();
  }
});
