import { expect, Page, test } from "@playwright/test";
import { LoginLocators } from "../locators/login-locators";
import { CommonPage } from "./common-page";
import { User } from "../models/User";
import { step } from "../utilities/logging";

export class LoginPage extends LoginLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }
 
  /**
   * Logs in with the provided email and password credentials.
   * @param user - The user's email and password
   */
  @step("Logging in with the provided email and password credentials")
  async login(user: User): Promise<void> {
    await test.step("Logging in with the provided email and password credentials", async () => {
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      await this.loginButton.click();
    })
  }

  /**
   * Verifies that the login was successful by checking the URL contains the account route.
   */
  @step("Verifying that the login was successful by checking the URL contains the account route.")
  async verifyLoginSuccess(): Promise<void> {
    await test.step("Verifying that the login was successful by checking the URL contains the account route.", async () => {
      await expect(this.page).toHaveURL(/route=account\/account/);
    })
  }
}
