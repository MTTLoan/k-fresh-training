import { expect, Page } from "@playwright/test";
import { CartLocators } from "../locators/cart-locators";
import { CommonPage } from "./common-page";

export class CartPage extends CartLocators {
  commonPage: CommonPage;
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the cart button to open the cart drawer
   */
  async clickCartButton() {
    await this.cartButton.click();
  }

  /**
   * Verifies that the cart drawer displays the expected message and total when the cart is empty
   * @param expectedMessage
   * @param expectedTotal
   */
  async verifyDrawerCartIsEmpty(
    expectedMessage: string,
    expectedTotal: string,
  ) {
    await expect(this.cartDrawerMessage).toContainText(expectedMessage);
    await expect(this.cartDrawerTotalLabel).toContainText(expectedTotal);
  }

  /**
   * Clicks the edit cart button to navigate to the main cart page
   */
  async clickEditCart() {
    await this.editCartButton.click();
  }

  /**
   * Verifies that the main cart page displays the expected message when the cart is empty
   * @param expectedMessage
   */
  async verifyMainCartIsEmpty(expectedMessage: string) {
    await expect(this.mainCartMessage).toContainText(expectedMessage);
  }

  /**
   * Verifies that the cart page has loaded by checking the URL contains the expected path
   */
  async verifyCartPageLoaded() {
    await expect(this.page).toHaveURL(/route=checkout\/cart/);
  }

  /**
   * Verifies that the cart contains a product with the specified name
   * @param productName
   */
  async verifyCartContainsProduct(productName: string) {
    await expect(this.productRow(productName)).toBeVisible();
  }

  /**
   * Verifies that the quantity input for a specific product in the cart displays the expected quantity
   * @param productName
   * @param quantity
   */
  async verifyProductQuantity(productName: string, quantity: number) {
    await expect(this.quantityInput(productName)).toHaveValue(
      quantity.toString(),
    );
  }

  /**
   * Clicks the remove button for a specific product in the cart to remove it
   * @param productName
   */
  async clickRemoveProduct(productName: string) {
    await this.removeButton(productName).click();
  }

  /**
   * Verifies that a specific product has been removed from the cart by checking that it no longer appears in the cart table
   * @param productName
   */
  async verifyProductRemovedFromCart(productName: string) {
    await expect(this.productRow(productName)).not.toBeVisible();
  }

  /**
   * Updates the quantity of a specific product in the cart by filling the quantity input and clicking the update button
   * @param productName
   * @param quantity
   */
  async updateProductQuantity(productName: string, quantity: number) {
    await this.quantityInput(productName).fill(quantity.toString());
    await this.updateButton(productName).click();
  }

  async verifyCartRowLineTotal(productName: string, expectedLineTotal: string) {
    await expect(this.totalLabel(productName)).toContainText(expectedLineTotal);
  }

  /**
   * Verifies that a success message is displayed after modifying the cart, such as updating product quantity or removing a product
   * @param expectedMessage
   */
  async verifyCartModifiedSuccessMessage(expectedMessage: string) {
    await expect(this.cartModifiedSuccessMessage).toContainText(
      expectedMessage,
    );
  }
}
