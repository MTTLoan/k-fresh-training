import { expect, Page, test } from '@playwright/test';
import { ProductLocators } from '../locators/product-locators';
import { CommonPage } from './common-page';
import { Product } from '../models/Product';
import { step } from '../utilities/logging';

/**
 * Class representing product page
 */
export class ProductPage extends ProductLocators {
  commonPage: CommonPage;

  /**
   * Creates an instance of ProductPage
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Increases the product quantity by clicking the increase quantity button a specified number of times
   * @param product
   */
  @step(
    'Increasing the product quantity by clicking the increase quantity button a specified number of times',
  )
  async increaseQuantity(product: Product): Promise<void> {
    await test.step('Increasing the product quantity by clicking the increase quantity button a specified number of times', async () => {
      for (let index = 1; index < product.quantity; index++) {
        await this.btnIncreaseQuantity.click();
      }
    });
  }

  /**
   * Clicks the add to cart button to add the product to the cart
   */
  @step('Clicking the add to cart button to add the product to the cart')
  async clickAddToCart(): Promise<void> {
    await test.step('Clicking the add to cart button to add the product to the cart', async () => {
      await this.btnAddToCart.click();
    });
  }

  /**
   * Verifies that the success alert displays the expected message after adding a product to the cart
   * @param expectedMessage
   */
  @step(
    'Verifying that the success alert displays the expected message after adding a product to the cart',
  )
  async verifyAddToCartSuccessMessage(expectedMessage: string): Promise<void> {
    await test.step('Verifying that the success alert displays the expected message after adding a product to the cart', async () => {
      await expect(this.divSuccessAlert).toContainText(expectedMessage);
    });
  }

  /**
   * Clicks the view cart link in the success alert to navigate to the cart page
   */
  @step(
    'Clicking the view cart link in the success alert to navigate to the cart page',
  )
  async clickViewCartLink(): Promise<void> {
    await test.step('Clicking the view cart link in the success alert to navigate to the cart page', async () => {
      await expect(this.lnkViewCart).toBeVisible();
      await this.lnkViewCart.click();
    });
  }
}
