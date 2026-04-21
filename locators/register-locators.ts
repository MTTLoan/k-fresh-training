import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class RegisterLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  firstNameInput!: Locator;
  lastNameInput!: Locator;
  emailInput!: Locator;
  telephoneInput!: Locator;
  passwordInput!: Locator;
  passwordConfirmInput!: Locator;
  newsletterYesRadio!: Locator;
  newsletterNoRadio!: Locator;
  privacyPolicyCheckbox!: Locator;
  continueButton!: Locator;

  initializeLocators() {
    super.initializeLocators();
    this.firstNameInput = this.page.locator("#input-firstname");
    this.lastNameInput = this.page.locator("#input-lastname");
    this.emailInput = this.page.locator("#input-email");
    this.telephoneInput = this.page.locator("#input-telephone");
    this.passwordInput = this.page.locator("#input-password");
    this.passwordConfirmInput = this.page.locator("#input-confirm");
    this.newsletterYesRadio = this.page.locator("input[name='newsletter'][value='1']");
    this.newsletterNoRadio = this.page.locator("input[name='newsletter'][value='0']");
    this.privacyPolicyCheckbox = this.page.locator("//label[@for='input-agree']");
    this.continueButton = this.page.locator("input[value='Continue']");
  }
}
