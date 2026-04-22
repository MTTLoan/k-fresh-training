import { expect, Page, test } from "@playwright/test";
import { CartLocators } from "../locators/cart-locators";
import { CommonPage } from "./common-page";
import { step } from "../utilities/logging";

export class CartPage extends CartLocators {
  commonPage: CommonPage;
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the cart button to open the cart drawer
   */
  @step("Clicking the cart button to open the cart drawer")
  async clickCartButton(): Promise<void> {
    await test.step("Clicking the cart button to open the cart drawer", async () => {
      await this.cartButton.click();
    })
  }

  /**
   * Verifies that the cart drawer displays the expected message and total when the cart is empty
   * @param expectedMessage
   * @param expectedTotal
   */
  @step("Verifying that the cart drawer displays the expected message and total when the cart is empty")
  async verifyDrawerCartIsEmpty(
    expectedMessage: string,
    expectedTotal: string,
  ): Promise<void> {
    await test.step("Verifying that the cart drawer displays the expected message and total when the cart is empty", async () => {
      await expect(this.cartDrawerMessage).toContainText(expectedMessage);
      await expect(this.cartDrawerTotalLabel).toContainText(expectedTotal);
    })
  }

  /**
   * Clicks the edit cart button to navigate to the main cart page
   */
  @step("Clicking the edit cart button to navigate to the main cart page")
  async clickEditCart(): Promise<void> {
    await test.step("Clicking the edit cart button to navigate to the main cart page", async () => {
      await this.editCartButton.click();
    })
  }

  /**
   * Verifies that the main cart page displays the expected message when the cart is empty
   * @param expectedMessage
   */
  @step("Verifying that the main cart page displays the expected message when the cart is empty")
  async verifyMainCartIsEmpty(expectedMessage: string): Promise<void> {
    await test.step("Verifying that the main cart page displays the expected message when the cart is empty", async () => {
      await expect(this.mainCartMessage).toContainText(expectedMessage);
    })
  }

  /**
   * Verifies that the cart page has loaded by checking the URL contains the expected path
   */
  @step("Verifying that the cart page has loaded")
  async verifyCartPageLoaded(): Promise<void> {
    await test.step("Verifying that the cart page has loaded", async () => {
      await expect(this.page).toHaveURL(/route=checkout\/cart/);
    })
  }

  /**
   * Verifies that the cart contains a product with the specified name
   * @param productName
   */
  @step("Verifying that the cart contains a product with the specified name")
  async verifyCartContainsProduct(productName: string): Promise<void> {
    await test.step("Verifying that the cart contains a product with the specified name", async () => {
      await expect(this.productRow(productName)).toBeVisible();
    })
  }

  /**
   * Verifies that the quantity input for a specific product in the cart displays the expected quantity
   * @param productName
   * @param quantity
   */
  @step("Verifying that the quantity input for a specific product in the cart displays the expected quantity")
  async verifyProductQuantity(productName: string, quantity: number): Promise<void> {
    await test.step("Verifying that the quantity input for a specific product in the cart displays the expected quantity", async () => {
      await expect(this.quantityInput(productName)).toHaveValue(
        quantity.toString(),
      );
    })
  }

  /**
   * Clicks the remove button for a specific product in the cart to remove it
   * @param productName
   */
  @step("Clicking the remove button for a specific product in the cart to remove it")
  async clickRemoveProduct(productName: string): Promise<void> {
    await test.step("Clicking the remove button for a specific product in the cart to remove it", async () => {
      await this.removeButton(productName).click();
    })
  }

  /**
   * Verifies that a specific product has been removed from the cart by checking that it no longer appears in the cart table
   * @param productName
   */
  @step("Verifying that a specific product has been removed from the cart by checking that it no longer appears in the cart table")
  async verifyProductRemovedFromCart(productName: string): Promise<void> {
    await test.step("Verifying that a specific product has been removed from the cart by checking that it no longer appears in the cart table", async () => {
      await expect(this.productRow(productName)).not.toBeVisible();
    })
  }

  /**
   * Updates the quantity of a specific product in the cart by filling the quantity input and clicking the update button
   * @param productName
   * @param quantity
   */
  @step("Updating the quantity of a specific product in the cart by filling the quantity input and clicking the update button")
  async updateProductQuantity(productName: string, quantity: number): Promise<void> {
    await test.step("Updating the quantity of a specific product in the cart by filling the quantity input and clicking the update button", async () => {
      await this.quantityInput(productName).fill(quantity.toString());
      await this.updateButton(productName).click();
    })
  }

  /**
   * Verifies that the line total for a specific product in the cart matches the expected total
   * @param productName
   * @param expectedLineTotal
   */
  @step("Verifying that the line total for a specific product in the cart matches the expected total")
  async verifyCartRowLineTotal(productName: string, expectedLineTotal: string): Promise<void> {
    await test.step("Verifying that the line total for a specific product in the cart matches the expected total", async () => {
      await expect(this.totalLabel(productName)).toContainText(expectedLineTotal);
    })
  }

  /**
   * Verifies that a success message is displayed after modifying the cart, such as updating product quantity or removing a product
   * @param expectedMessage
   */
  @step("Verifying that a success message is displayed after modifying the cart")
  async verifyCartModifiedSuccessMessage(expectedMessage: string): Promise<void> {
    await test.step("Verifying that a success message is displayed after modifying the cart", async () => {
      await expect(this.cartModifiedSuccessMessage).toContainText(
        expectedMessage,
      );
    })
  }

  /**
   * Clicks the checkout button to proceed to the checkout page
   */
  @step("Clicking the checkout button to proceed to the checkout page")
  async clickCheckoutButton(): Promise<void> {
    await test.step("Clicking the checkout button to proceed to the checkout page", async () => {
      await this.checkoutButton.click();
    })
  }
}
