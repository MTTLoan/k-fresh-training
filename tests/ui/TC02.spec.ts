import { test, expect } from "@playwright/test";

test("TC02 - Add Product to Cart", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  await page.fill('input[name="search"]', "MacBook Pro");
  await page.click('button[type="submit"].type-text');
  await page.waitForURL(/search/);

  const inStockCheckbox = page.locator("#mz-fss-1--1");
  await inStockCheckbox.evaluate((el: HTMLInputElement) => el.click());
  await page.waitForURL(/mz_fss=-1/);

  const productLinks = page.locator("a.text-ellipsis-2", {
    hasText: "MacBook Pro",
  });
  await expect(productLinks).toHaveCount(2);

  const productLink = productLinks.nth(1);
  await expect(productLink).toBeVisible();
  await productLink.click();

  await expect(page.locator("h1")).toContainText("MacBook Pro");

  const addToCartButton = page
    .locator("button.btn-cart:not([disabled])")
    .nth(1);
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  const successToast = page.locator("div.toast-body", {
    hasText: "Success: You have added MacBook Pro to your shopping cart!",
  });
  await expect(successToast).toBeVisible();

  const viewCartLink = page.locator("a", { hasText: "View Cart" }).first();
  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  await expect(page).toHaveURL(/route=checkout\/cart/);
  const cartTable = page
    .locator("table.table.table-bordered", { hasText: "MacBook Pro" })
    .first();
  await expect(cartTable).toContainText("MacBook Pro");
});
