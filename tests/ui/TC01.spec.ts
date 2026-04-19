import { test, expect } from "@playwright/test";

test("TC01 - Verify Empty Cart", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.locator("#entry_217847")).toContainText(
    "Your shopping cart is empty!",
  );
  await page.getByRole("button", { name: " Edit cart" }).click();
  await expect(page.locator("#content")).toContainText(
    "Your shopping cart is empty!",
  );
});
