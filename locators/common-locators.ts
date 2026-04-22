import { Locator, Page } from '@playwright/test';

/**
 * Class representing common locators 
 */
export class CommonLocators {
  page: Page;

  /**
   * Creates an instance of CommonLocators
   * @param page
   */
  constructor(page: Page) {
    this.page = page;
    this.initializeLocators();
  }

  /**
   * Sets the page object   
   * @param newPage
   */
  setPage(newPage: Page): void {
    this.page = newPage;
    this.initializeLocators();
  }

  /**
   * Gets the page object
   * @returns Page
   */
  getPage(): Page {
    return this.page;
  }

  btnSubmit!: Locator;
  btnSave!: Locator;
  divSuccessMessage!: Locator;
  divErrorMessage!: Locator;
  btnClick!: Locator;

  /**
   * Initializes locators
   */
  initializeLocators(): void {
    this.btnSubmit = this.page.getByRole('button', { name: 'Submit' });
    this.btnSave = this.page.getByRole('button', { name: 'Save' });
    this.divSuccessMessage = this.page.locator(
      'xpath=//*[contains(@class,\'flash\') and contains(@class,\'success\')]',
    );
    this.divErrorMessage = this.page.locator(
      'xpath=//*[contains(@class,\'flash\') and contains(@class,\'error\')]',
    );
    this.btnClick = this.page.getByRole('button');
  }
}
