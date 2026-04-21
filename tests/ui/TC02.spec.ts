import { test, expect } from "@playwright/test";

test("TC02 - Add Product to Cart", async ({ page }) => {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=50",
  );
  await page.waitForLoadState("networkidle");

  // 2. Click + to quatity is 4
  const plusButton = page.getByRole("button", { name: "Increase quantity" });
  await expect(plusButton).toBeVisible();
  for (let i = 0; i < 2; i++) {
    await plusButton.click();
  }

  // 3. Verify quantity field displays value = 3
  const quantityInput = page.getByRole("spinbutton", { name: "Qty" });
  await expect(quantityInput).toHaveValue("4");

  // 4. Choose options: Small
  await page.locator("#input-option234-216836").selectOption("53");

  // 5. Click the "Add to Cart" button
  await page.getByRole("button", { name: "Add to Cart" }).click();

  // 6. Verify success toast message appears: "Success: You have added MacBook Pro to your shopping cart!"
  await expect(page.getByRole("alert")).toContainText(
    'Success: You have added Apple Cinema 30" to your shopping cart!',
  );

  // 7. Click the "View Cart" link on the success notification
  const viewCartLink = page.locator("a", { hasText: "View Cart" }).first();
  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  // 8. Verify page navigates to cart page
  await expect(page).toHaveURL(/route=checkout\/cart/);
  const cartTable = page
    .locator("table.table.table-bordered", { hasText: 'Apple Cinema 30"' })
    .first();
  await expect(cartTable).toContainText('Apple Cinema 30"');

  // 9. Verify "MacBook Pro" is visible in the cart table
  const cartRow = page
    .locator("table.table.table-bordered")
    .first()
    .locator("tr", {
      hasText: 'Apple Cinema 30"',
    });

  // 10. Verify quantity of "Apple Cinema 30"" is 4
  const cartQuantityInput = cartRow.locator('input[name^="quantity"]');
  await expect(cartQuantityInput).toHaveValue("4");
});
