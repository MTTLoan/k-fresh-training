import { expect, Page } from "@playwright/test";
import { RegisterLocators } from "../locators/register-locators";
import { CommonPage } from "./common-page";

export class RegisterPage extends RegisterLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Fills in the registration form with the provided user details and submits it.
   * @param firstName - The user's first name
   * @param lastName - The user's last name
   * @param email - The user's email address
   * @param telephone - The user's telephone number
   * @param password - The user's password
   */
  async register(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    password: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
    await this.passwordInput.fill(password);
    await this.passwordConfirmInput.fill(password);
    await this.privacyPolicyCheckbox.check();
    await this.continueButton.click();
  }

  /**
   * Subscribes to the newsletter by selecting the "Yes" radio button.
   */
  async subscribeNewsletter() {
    await this.newsletterYesRadio.check();
  }

  /**
   * Verifies that the registration was successful by checking for the success page content.
   */
  async verifyRegistrationSuccess() {
    await expect(this.page).toHaveURL(/route=account\/success/);
  }
}
