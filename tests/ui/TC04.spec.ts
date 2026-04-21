import { test, expect } from "@playwright/test";

test("TC04 - Update Product Quantity", async ({ page }) => {
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

  // 7. Change the quantity field to "2"
  const quantityInput = cartRow.locator("input[name^='quantity']").first();
  await expect(quantityInput).toHaveValue("1");
  await quantityInput.fill("2");

  // 8. Click the "Update" button for MacBook Pro
  const updateButton = cartRow.locator('button[title="Update"]').first();
  await expect(updateButton).toBeVisible();
  await updateButton.click();

  // 9. Verify success toast message appears: "Success: You have modified your shopping cart!"
  const successToast = page
    .locator(".alert-success", {
      hasText: "Success: You have modified your shopping cart!",
    })
    .first();
  await expect(successToast).toBeVisible();

  // 10. Verify the quantity field now shows "2"
  await expect(quantityInput).toHaveValue("2");

  // 11. Verify the line total shows "$4,000.00"
  await expect(cartRow).toContainText("$4,000.00");
});
