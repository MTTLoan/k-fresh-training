import { test, expect } from "@playwright/test";

test("TC02 - Add Product to Cart", async ({ page }) => {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=62&search=macbook+pro",
  );

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
