import { expect, Page } from "@playwright/test";
import { CheckoutLocators } from "../locators/checkout-locators";
import { CommonPage } from "./common-page";

export class CheckoutPage extends CheckoutLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Fills the billing address details.
   */
  async fillBillingDetails(
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    city: string,
    postcode: string,
    country: string,
    region: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.address1Input.fill(address1);
    await this.cityInput.fill(city);
    await this.postcodeInput.fill(postcode);
    
    // Select country by label to trigger region update
    await this.countrySelect.selectOption({ label: country });
    // Wait for the region dropdown to update before selecting
    await this.page.waitForTimeout(1000); 
    await this.regionSelect.selectOption({ label: region });
  }

  /**
   * Agrees to terms and continues to the final confirmation step.
   */
  async agreeTermsAndContinue() {
    await this.termsCheckbox.click();
    await this.continueButton.click();
  }

  /**
   * Confirms the order.
   */
  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  /**
   * Verifies order success page has loaded.
   */
  async verifyOrderSuccess() {
    await expect(this.page).toHaveURL(/route=checkout\/success/);
  }
}
