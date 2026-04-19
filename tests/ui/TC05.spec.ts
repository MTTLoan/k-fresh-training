import { test, expect } from "@playwright/test";

test("TC05 - Update Product Quantity to 0 (Remove via Quantity)", async ({
  page,
}) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  await page.fill('input[name="search"]', "MacBook Pro");
  await page.click('button[type="submit"].type-text');
  await page.waitForURL(/search/);

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

  const viewCartLink = page.locator("a", { hasText: "View Cart" }).first();
  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  await expect(page).toHaveURL(/route=checkout\/cart/);

  const cartRow = page
    .locator("table.table.table-bordered")
    .first()
    .locator("tr", { hasText: "MacBook Pro" })
    .first();
  await expect(cartRow).toBeVisible();

  const quantityInput = cartRow.locator("input[name^='quantity']").first();
  await expect(quantityInput).toHaveValue("1");
  await quantityInput.fill("0");

  const updateButton = cartRow.locator('button[title="Update"]').first();
  await expect(updateButton).toBeVisible();
  await updateButton.click();

  await expect(cartRow).toHaveCount(0);
  await expect(page.locator("#content")).toContainText(
    "Your shopping cart is empty!",
  );
});
