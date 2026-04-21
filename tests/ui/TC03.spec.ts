import { test, expect } from "@playwright/test";

test("TC03 - Remove Product from Cart", async ({ page }) => {
  // 1. Navigate to product page of "MacBook Pro"
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=62&search=macbook+pro",
  );

  // 2. Click the "Add to Cart" button
  await page.getByRole("button", { name: "Add to Cart" }).click();

  // 3. Verify success toast message appears: "Success: You have added MacBook Pro to your shopping cart!"
  await expect(page.getByRole("alert")).toContainText(
    "Success: You have added MacBook Pro to your shopping cart!",
  );

  // 4. Click the "View Cart" link on the success notification
  const viewCartLink = page.locator("a", { hasText: "View Cart" }).first();
  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  // 5. Verify page navigates to cart page
  await expect(page).toHaveURL(/route=checkout\/cart/);

  // 6. Locate the MacBook Pro row in the cart table
  const cartRow = page
    .locator("table.table.table-bordered")
    .first()
    .locator("tr", {
      hasText: "MacBook Pro",
    });
  await expect(cartRow).toBeVisible();

  // 8. Click the "Remove" button for MacBook Pro
  const removeButton = cartRow.locator('button[title="Remove"]').first();
  await expect(removeButton).toBeVisible();
  await removeButton.click();

  // 9. Verify the product row is no longer visible (count = 0)
  await expect(cartRow).toHaveCount(0);

  // 10. Verify empty cart message appears: "Your shopping cart is empty!"
  await expect(page.locator("#content")).toContainText(
    "Your shopping cart is empty!",
  );
});
