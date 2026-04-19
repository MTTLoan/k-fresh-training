import { test, expect } from "@playwright/test";

test.describe("Cart module", () => {
  test("Verify Empty Cart", async ({ page }) => {
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

  test("Add Product to Cart", async ({ page }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page
      .getByRole("textbox", { name: "Search For Products" })
      .fill("MacBook Pro");
    await page.getByRole("button", { name: "Search" }).click();
    await page.locator("#mz-filter-panel-0-3").getByText("In stock").click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page
      .locator(".product-layout")
      .filter({ hasText: "MacBook Pro" })
      .first()
      .click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("link", { name: "View Cart " }).click();
    await expect(
      page
        .locator("#content table.table-bordered tbody tr")
        .filter({ hasText: "MacBook Pro" }),
    ).toBeVisible({ timeout: 15000 });
  });

  test("Remove Product from Cart", async ({ page }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page
      .getByRole("textbox", { name: "Search For Products" })
      .fill("MacBook Pro");
    await page.getByRole("button", { name: "Search" }).click();
    await page.locator("#mz-filter-panel-0-3").getByText("In stock").click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page
      .locator(".product-layout")
      .filter({ hasText: "MacBook Pro" })
      .first()
      .click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("link", { name: "View Cart " }).click();

    const row = page
      .locator("#content table.table-bordered tbody tr")
      .filter({ hasText: "MacBook Pro" });

    await row.locator('button[title="Remove"]').click();

    await expect(row).not.toBeVisible({ timeout: 10000 });
  });

  test("Update Product Quantity", async ({ page }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page
      .getByRole("textbox", { name: "Search For Products" })
      .fill("MacBook Pro");
    await page.getByRole("button", { name: "Search" }).click();
    await page.locator("#mz-filter-panel-0-3").getByText("In stock").click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page
      .locator(".product-layout")
      .filter({ hasText: "MacBook Pro" })
      .first()
      .click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("link", { name: "View Cart " }).click();

    const row = page
      .locator("#content table.table-bordered tbody tr")
      .filter({ hasText: "MacBook Pro" });

    const quantityInput = row.locator('input[name^="quantity"]');

    await quantityInput.fill("2");

    await row.locator('button[title="Update"]').click();

    await expect(
      page
        .locator(".alert-success")
        .filter({ hasText: "modified your shopping cart" }),
    ).toBeVisible({ timeout: 10000 });

    await expect(quantityInput).toHaveValue("2");

    await expect(row.locator("td.text-right").last()).toContainText(
      "$4,000.00",
    );
  });

  test("Update Product Quantity to 0", async ({ page }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page
      .getByRole("textbox", { name: "Search For Products" })
      .fill("MacBook Pro");
    await page.getByRole("button", { name: "Search" }).click();
    await page.locator("#mz-filter-panel-0-3").getByText("In stock").click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await page
      .locator(".product-layout")
      .filter({ hasText: "MacBook Pro" })
      .first()
      .click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("link", { name: "View Cart " }).click();

    const row = page
      .locator("#content table.table-bordered tbody tr")
      .filter({ hasText: "MacBook Pro" });

    const quantityInput = row.locator('input[name^="quantity"]');

    await quantityInput.fill("0");

    await row.locator('button[title="Update"]').click();

    await expect(row).not.toBeVisible({ timeout: 10000 });
  });
});
