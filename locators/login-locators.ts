import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

/**
 * Class representing login locators
 */
export class LoginLocators extends CommonLocators {
  /**
   * Creates an instance of LoginLocators
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  inputEmail!: Locator;
  inputPassword!: Locator;
  btnLogin!: Locator;

  /**
   * Initializes locators
   */
  initializeLocators(): void {
    super.initializeLocators();
    this.inputEmail = this.page.locator('#input-email');
    this.inputPassword = this.page.locator('#input-password');
    this.btnLogin = this.page.locator('input[value=\'Login\']');
  }
}
