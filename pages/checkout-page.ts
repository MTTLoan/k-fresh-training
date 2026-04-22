import { expect, Page, test } from "@playwright/test";
import { CheckoutLocators } from "../locators/checkout-locators";
import { CommonPage } from "./common-page";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { step } from "../utilities/logging";

export class CheckoutPage extends CheckoutLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Fills the billing address details.
   * @param user
   * @param order
   */
  @step("Filling in the billing address details")
  async fillBillingDetails( user : User, order : Order ): Promise<void> {
    await test.step("Filling in the billing address details", async () => {
      await this.firstNameInput.fill(user.firstName);
      await this.lastNameInput.fill(user.lastName);
      await this.companyInput.fill(order.company);
      await this.address1Input.fill(order.address);
      await this.cityInput.fill(order.city);
      await this.postcodeInput.fill(order.postcode);
      await this.countrySelect.selectOption({ label: order.country });
      await this.page.waitForTimeout(1000); 
      await this.regionSelect.selectOption({ label: order.region });
    })
  }

  /**
   * Agrees to terms and continues to the final confirmation step.
   */
  @step("Agreeing to terms and continuing to the final confirmation step")
  async agreeTermsAndContinue(): Promise<void> {
    await test.step("Agreeing to terms and continuing to the final confirmation step", async () => {
      await this.termsCheckbox.click();
      await this.continueButton.click();
    })
  }

  /**
   * Confirms the order.
   */
  @step("Confirming the order")
  async confirmOrder(): Promise<void> {
    await test.step("Confirming the order", async () => {
      await this.confirmOrderButton.click();
    })
  }

  /**
   * Verifies order success page has loaded.
   */
  @step("Verifying that the order success page has loaded")
  async verifyOrderSuccess(): Promise<void> {
    await test.step("Verifying that the order success page has loaded", async () => {
      await expect(this.page).toHaveURL(/route=checkout\/success/);
    })
  }
}
