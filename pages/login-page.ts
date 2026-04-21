import { expect, Page } from "@playwright/test";
import { LoginLocators } from "../locators/login-locators";
import { CommonPage } from "./common-page";

export class LoginPage extends LoginLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Logs in with the provided email and password credentials.
   * @param email - The user's email address
   * @param password - The user's password
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verifies that the login was successful by checking the URL contains the account route.
   */
  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/route=account\/account/);
  }
}
