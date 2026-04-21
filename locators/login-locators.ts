import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class LoginLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  emailInput!: Locator;
  passwordInput!: Locator;
  loginButton!: Locator;

  initializeLocators() {
    super.initializeLocators();
    this.emailInput = this.page.locator("#input-email");
    this.passwordInput = this.page.locator("#input-password");
    this.loginButton = this.page.locator("input[value='Login']");
  }
}
