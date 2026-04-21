import { expect, Page } from "@playwright/test";
import { ProductLocators } from "../locators/product-locators";
import { CommonPage } from "./common-page";

export class ProductPage extends ProductLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Increases the product quantity by clicking the increase quantity button a specified number of times
   * @param quantity
   */
  async increaseQuantity(quantity: number) {
    for (let index = 1; index < quantity; index++) {
      await this.increaseQuantityButton.click();
    }
  }

  /**
   * Clicks the add to cart button to add the product to the cart
   */
  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  /**
   * Verifies that the success alert displays the expected message after adding a product to the cart
   * @param expectedMessage
   */
  async verifyAddToCartSuccessMessage(expectedMessage: string) {
    await expect(this.successAlert).toContainText(expectedMessage);
  }

  /**
   * Clicks the view cart link in the success alert to navigate to the cart page
   */
  async clickViewCartLink() {
    await expect(this.viewCartLink).toBeVisible();
    await this.viewCartLink.click();
  }
}
