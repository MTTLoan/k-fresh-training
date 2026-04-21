import { Page } from "@playwright/test";
import { CommonLocators } from "../locators/common-locators";

export class CommonPage extends CommonLocators {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the specified URL.
   */
  async goto(url: string) {
    await this.page.goto(url);
  }
}
