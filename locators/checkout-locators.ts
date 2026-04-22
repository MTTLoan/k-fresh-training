import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class CheckoutLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  firstNameInput!: Locator;
  lastNameInput!: Locator;
  companyInput!: Locator;
  address1Input!: Locator;
  address2Input!: Locator;
  cityInput!: Locator;
  postcodeInput!: Locator;
  countrySelect!: Locator;
  regionSelect!: Locator;
  termsCheckbox!: Locator;
  continueButton!: Locator;
  confirmOrderButton!: Locator;

  initializeLocators() {
    super.initializeLocators();
    this.firstNameInput = this.page.locator("#input-payment-firstname");
    this.lastNameInput = this.page.locator("#input-payment-lastname");
    this.companyInput = this.page.locator("#input-payment-company");
    this.address1Input = this.page.locator("#input-payment-address-1");
    this.address2Input = this.page.locator("#input-payment-address-2");
    this.cityInput = this.page.locator("#input-payment-city");
    this.postcodeInput = this.page.locator("#input-payment-postcode");
    this.countrySelect = this.page.locator("#input-payment-country");
    this.regionSelect = this.page.locator("#input-payment-zone");
    this.termsCheckbox = this.page.locator("//label[@for='input-agree']");
    this.continueButton = this.page.locator("#button-save");
    this.confirmOrderButton = this.page.locator("#button-confirm");
  }
}
