import { expect, Page, test } from "@playwright/test";
import { RegisterLocators } from "../locators/register-locators";
import { CommonPage } from "./common-page";
import { User } from "../models/User";
import { step } from "../utilities/logging";

export class RegisterPage extends RegisterLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Fills in the registration form with the provided user details and submits it.
   * @param user
   */
  @step("Fills in the registration form with the provided user details and submits it")
  async register(user: User): Promise<void> {
    await test.step("Fills in the registration form with the provided user details and submits it", async () => {
      await this.firstNameInput.fill(user.firstName);
      await this.lastNameInput.fill(user.lastName);
      await this.emailInput.fill(user.email);
      await this.telephoneInput.fill(user.telephone);
      await this.passwordInput.fill(user.password);
      await this.passwordConfirmInput.fill(user.password);
      await this.privacyPolicyCheckbox.check();
      await this.continueButton.click();
    })
  }

  /**
   * Subscribes to the newsletter by selecting the 'Yes' radio button
   */
  @step("Subscribes to the newsletter by selecting the 'Yes' radio button")
  async subscribeNewsletter(): Promise<void> {
    await test.step("Subscribes to the newsletter by selecting the 'Yes' radio button", async () => {
      await this.newsletterYesRadio.check();
    })
  }

  /**
   * Verifies that the registration was successful by checking for the success page content.
   */
  @step("Verifies that the registration was successful by checking for the success page content.")
  async verifyRegistrationSuccess(): Promise<void> {
    await test.step("Verifies that the registration was successful by checking for the success page content.", async () => {
      await expect(this.page).toHaveURL(/route=account\/success/);
    })
  }
}
