import { expect, Page, test } from '@playwright/test';
import { CartLocators } from '../locators/cart-locators';
import { CommonPage } from './common-page';
import { Product } from '../models/Product';
import { step } from '../utilities/logging';

/**
 * Class representing cart page
 */
export class CartPage extends CartLocators {
  commonPage: CommonPage;
  /**
   * Creates an instance of CartPage.
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the cart button to open the cart drawer
   */
  @step('Clicking the cart button to open the cart drawer')
  async clickCartButton(): Promise<void> {
    await test.step('Clicking the cart button to open the cart drawer', async () => {
      await this.btnCart.click();
    });
  }

  /**
   * Verifies that the cart drawer displays the expected message and total when the cart is empty
   * @param expectedMessage
   * @param expectedTotal
   */
  @step(
    'Verifying that the cart drawer displays the expected message and total when the cart is empty',
  )
  async verifyDrawerCartIsEmpty(
    expectedMessage: string,
    expectedTotal: string,
  ): Promise<void> {
    await test.step('Verifying that the cart drawer displays the expected message and total when the cart is empty', async () => {
      await expect(this.divCartDrawerMessage).toContainText(expectedMessage);
      await expect(this.spanCartDrawerTotalLabel).toContainText(expectedTotal);
    });
  }

  /**
   * Clicks the edit cart button to navigate to the main cart page
   */
  @step('Clicking the edit cart button to navigate to the main cart page')
  async clickEditCart(): Promise<void> {
    await test.step('Clicking the edit cart button to navigate to the main cart page', async () => {
      await this.btnEditCart.click();
    });
  }

  /**
   * Verifies that the main cart page displays the expected message when the cart is empty
   * @param expectedMessage
   */
  @step(
    'Verifying that the main cart page displays the expected message when the cart is empty',
  )
  async verifyMainCartIsEmpty(expectedMessage: string): Promise<void> {
    await test.step('Verifying that the main cart page displays the expected message when the cart is empty', async () => {
      await expect(this.pMainCartMessage).toContainText(expectedMessage);
    });
  }

  /**
   * Verifies that the cart page has loaded by checking the URL contains the expected path
   */
  @step('Verifying that the cart page has loaded')
  async verifyCartPageLoaded(): Promise<void> {
    await test.step('Verifying that the cart page has loaded', async () => {
      await expect(this.page).toHaveURL(/route=checkout\/cart/);
    });
  }

  /**
   * Verifies that the cart contains a product with the specified name
   * @param product
   */
  @step('Verifying that the cart contains a product with the specified name')
  async verifyCartContainsProduct(product: Product): Promise<void> {
    await test.step('Verifying that the cart contains a product with the specified name', async () => {
      await expect(this.rowProduct(product.name)).toBeVisible();
    });
  }

  /**
   * Verifies that the quantity input for a specific product in the cart displays the expected quantity
   * @param product
   */
  @step(
    'Verifying that the quantity input for a specific product in the cart displays the expected quantity',
  )
  async verifyProductQuantity(product: Product): Promise<void> {
    await test.step('Verifying that the quantity input for a specific product in the cart displays the expected quantity', async () => {
      await expect(this.inputQuantity(product.name)).toHaveValue(
        product.quantity.toString(),
      );
    });
  }

  /**
   * Clicks the remove button for a specific product in the cart to remove it
   * @param product
   */
  @step(
    'Clicking the remove button for a specific product in the cart to remove it',
  )
  async clickRemoveProduct(product: Product): Promise<void> {
    await test.step('Clicking the remove button for a specific product in the cart to remove it', async () => {
      await this.btnRemove(product.name).click();
    });
  }

  /**
   * Verifies that a specific product has been removed from the cart by checking that it no longer appears in the cart table
   * @param product
   */
  @step(
    'Verifying that a specific product has been removed from the cart by checking that it no longer appears in the cart table',
  )
  async verifyProductRemovedFromCart(product: Product): Promise<void> {
    await test.step('Verifying that a specific product has been removed from the cart by checking that it no longer appears in the cart table', async () => {
      await expect(this.rowProduct(product.name)).not.toBeVisible();
    });
  }

  /**
   * Updates the quantity of a specific product in the cart by filling the quantity input and clicking the update button
   * @param product
   * @param quantity - Optional quantity to update to. Defaults to product.quantity.
   */
  @step(
    'Updating the quantity of a specific product in the cart by filling the quantity input and clicking the update button',
  )
  async updateProductQuantity(
    product: Product,
    quantity: number = product.quantity,
  ): Promise<void> {
    await test.step('Updating the quantity of a specific product in the cart by filling the quantity input and clicking the update button', async () => {
      await this.inputQuantity(product.name).fill(quantity.toString());
      await this.btnUpdate(product.name).click();
    });
  }

  /**
   * Verifies that the line total for a specific product in the cart matches the expected total
   * @param product
   */
  @step(
    'Verifying that the line total for a specific product in the cart matches the expected total',
  )
  async verifyCartRowLineTotal(product: Product): Promise<void> {
    await test.step('Verifying that the line total for a specific product in the cart matches the expected total', async () => {
      await expect(this.cellTotal(product.name)).toContainText(
        product.totalPrice,
      );
    });
  }

  /**
   * Verifies that a success message is displayed after modifying the cart, such as updating product quantity or removing a product
   * @param expectedMessage
   */
  @step(
    'Verifying that a success message is displayed after modifying the cart',
  )
  async verifyCartModifiedSuccessMessage(
    expectedMessage: string,
  ): Promise<void> {
    await test.step('Verifying that a success message is displayed after modifying the cart', async () => {
      await expect(this.divCartModifiedSuccessMessage).toContainText(
        expectedMessage,
      );
    });
  }

  /**
   * Clicks the checkout button to proceed to the checkout page
   */
  @step('Clicking the checkout button to proceed to the checkout page')
  async clickCheckoutButton(): Promise<void> {
    await test.step('Clicking the checkout button to proceed to the checkout page', async () => {
      await this.lnkCheckout.click();
    });
  }
}
