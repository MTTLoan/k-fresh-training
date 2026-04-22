import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

/**
 * Class representing product locators
 */
export class ProductLocators extends CommonLocators {
  /**
   * Creates an instance of ProductLocators
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  btnIncreaseQuantity!: Locator;
  inputQuantity!: Locator;
  btnAddToCart!: Locator;
  divSuccessAlert!: Locator;
  lnkViewCart!: Locator;

  /**
   * Initializes locators
   */
  initializeLocators(): void {
    super.initializeLocators();
    this.btnIncreaseQuantity = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.inputQuantity = this.page.locator('(//input[@name=\'quantity\'])[1]');
    this.btnAddToCart = this.page.getByRole('button', {
      name: 'Add to Cart',
    });
    this.divSuccessAlert = this.page.getByRole('alert');
    this.lnkViewCart = this.page
      .getByRole('link', { name: 'View Cart' })
      .first();
  }
}
