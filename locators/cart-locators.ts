import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

/**
 * Class representing cart locators
 */
export class CartLocators extends CommonLocators {
  /**
   * Creates an instance of CartLocators
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  btnCart!: Locator;
  divCartDrawerMessage!: Locator;
  spanCartDrawerTotalLabel!: Locator;
  btnEditCart!: Locator;
  pMainCartMessage!: Locator;
  divCartModifiedSuccessMessage!: Locator;
  lnkCheckout!: Locator;

  /**
   * Initializes locators
   */
  initializeLocators(): void {
    super.initializeLocators();
    this.btnCart = this.page.locator('(//div[@class=\'cart-icon\'])[1]');
    this.divCartDrawerMessage = this.page.locator(
      '//div[contains(@class,\'widget-total\')]',
    );
    this.spanCartDrawerTotalLabel = this.page.locator(
      '//td[text()=\'Total:\']/following-sibling::td/strong',
    );
    this.btnEditCart = this.page.getByRole('button', { name: 'Edit cart' });
    this.pMainCartMessage = this.page.locator(
      '//h1[contains(@class,\'page-title\')]/following-sibling::p',
    );
    this.divCartModifiedSuccessMessage = this.page
      .locator('//div[@class=\'alert alert-success alert-dismissible\']')
      .first();
    this.lnkCheckout = this.page.getByRole('link', {
      name: 'Checkout',
      exact: true,
    });
  }

  /**
   * Returns the row locator for a specific product
   * @param productName
   * @returns Locator
   */
  rowProduct(productName: string): Locator {
    return this.page.locator(`(//td/a[text()='${productName}']/../..)[1]`);
  }

  /**
   * Returns the remove button locator for a specific product
   * @param productName
   * @returns Locator
   */
  btnRemove(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//button[@title="Remove"]`,
    );
  }

  /**
   * Returns the update button locator for a specific product
   * @param productName
   * @returns Locator
   */
  btnUpdate(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//button[@title="Update"]`,
    );
  }

  /**
   * Returns the quantity input locator for a specific product
   * @param productName
   * @returns Locator
   */
  inputQuantity(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//input[starts-with(@name,'quantity')]`,
    );
  }

  /**
   * Returns the total cell locator for a specific product
   * @param productName
   * @returns Locator
   */
  cellTotal(productName: string): Locator {
    return this.page.locator(
      `(//td/a[text()='${productName}']/../..//td)[last()]`,
    );
  }
}
