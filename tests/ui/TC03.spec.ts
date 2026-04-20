import { test, expect } from "@playwright/test";

test("TC03 - Remove Product from Cart", async ({ page }) => {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=62&search=macbook+pro",
  );

  const addToCartButton = page
    .locator("button.btn-cart:not([disabled])")
    .nth(1);
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  const viewCartLink = page.locator("a", { hasText: "View Cart" }).first();
  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  await expect(page).toHaveURL(/route=checkout\/cart/);

  const cartRow = page
    .locator("table.table.table-bordered")
    .first()
    .locator("tr", {
      hasText: "MacBook Pro",
    });
  await expect(cartRow).toBeVisible();

  const removeButton = cartRow.locator('button[title="Remove"]').first();
  await expect(removeButton).toBeVisible();
  await removeButton.click();

  await expect(cartRow).toHaveCount(0);
  await expect(page.locator("#content")).toContainText(
    "Your shopping cart is empty!",
  );
});
