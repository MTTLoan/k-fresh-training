import { test, expect } from "@playwright/test";

test("TC02 - Add Product to Cart", async ({ page }) => {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=62&search=macbook+pro",
  );
  await page.waitForLoadState("networkidle");

  // Click + twice to set quantity to 3
  const plusButton = page.locator('button[data-spinner="up"]:visible').first();
  await expect(plusButton).toBeVisible();
  for (let i = 0; i < 2; i++) {
    await plusButton.click();
  }

  // Verify quantity field displays value = 3
  const quantityInput = page.locator('input[name="quantity"]:visible').first();
  await expect(quantityInput).toHaveValue("3");

  const addToCartButton = page
    .locator("button.btn-cart:not([disabled]):visible")
    .first();
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

  // Verify quantity of "MacBook Pro" is 3
  const cartRow = page
    .locator("table.table.table-bordered")
    .first()
    .locator("tr", {
      hasText: "MacBook Pro",
    });
  const cartQuantityInput = cartRow.locator('input[name^="quantity"]');
  await expect(cartQuantityInput).toHaveValue("3");
});
