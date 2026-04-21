import { test, expect } from "@playwright/test";

test("TC05 - Update Product Quantity to 0 (Remove via Quantity)", async ({
  page,
}) => {
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
    .locator("tr", { hasText: "MacBook Pro" })
    .first();
  await expect(cartRow).toBeVisible();

  // 7. Change the quantity field to "0"
  const quantityInput = cartRow.locator("input[name^='quantity']").first();
  await quantityInput.fill("0");

  // 8. Click the "Update" button
  const updateButton = cartRow.locator('button[title="Update"]').first();
  await updateButton.click();

  // 9. Verify the product row is no longer visible (count = 0)
  await expect(cartRow).toHaveCount(0);

  // 10. Verify "Your shopping cart is empty!" message appears
  await expect(page.locator("#content")).toContainText(
    "Your shopping cart is empty!",
  );
});
