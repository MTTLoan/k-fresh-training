import { test, expect } from "@playwright/test";

test("TC01 - Verify Empty Cart", async ({ page }) => {
  // 1. Navigate to the homepage
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  // 2. Click on the cart icon
  await page.getByRole("button", { name: "0" }).click();

  // 3. Verify the cart page shows "Your shopping cart is empty!" message and total is "$0.00"
  await expect(page.locator("#entry_217847")).toContainText(
    "Your shopping cart is empty!",
  );

  // 4. Verify Total is $0.00
  await expect(page.getByRole("rowgroup")).toContainText("$0.00");

  // 5. Click the "Edit cart" button
  await page.getByRole("button", { name: " Edit cart" }).click();

  // 6. Verify the cart page shows "Your shopping cart is empty!" message and total is "$0.00"
  await expect(page.locator("#content")).toContainText(
    "Your shopping cart is empty!",
  );
});
