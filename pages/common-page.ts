import { Page } from '@playwright/test';
import { CommonLocators } from '../locators/common-locators';

/**
 * Class representing common page
 */
export class CommonPage extends CommonLocators {
  /**
   * Creates an instance of CommonPage
   * @param page
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the specified URL.
   * @param url
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
