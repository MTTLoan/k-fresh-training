import { expect, Page, test } from '@playwright/test';
import { CheckoutLocators } from '../locators/checkout-locators';
import { CommonPage } from './common-page';
import { User } from '../models/User';
import { Order } from '../models/Order';
import { step } from '../utilities/logging';

/**
 * Class representing checkout page
 */
export class CheckoutPage extends CheckoutLocators {
  commonPage: CommonPage;

  /**
   * Creates an instance of CheckoutPage.
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Fills the billing address details.
   * @param user
   * @param order
   */
  @step('Filling in the billing address details')
  async fillBillingDetails(user: User, order: Order): Promise<void> {
    await test.step('Filling in the billing address details', async () => {
      await this.inputFirstName.fill(user.firstName);
      await this.inputLastName.fill(user.lastName);
      await this.inputCompany.fill(order.company);
      await this.inputAddress1.fill(order.address);
      await this.inputCity.fill(order.city);
      await this.inputPostcode.fill(order.postcode);
      await this.ddlCountry.selectOption({ label: order.country });
      await this.page.waitForTimeout(1000);
      await this.ddlRegion.selectOption({ label: order.region });
    });
  }

  /**
   * Agrees to terms and continues to the final confirmation step.
   */
  @step('Agreeing to terms and continuing to the final confirmation step')
  async agreeTermsAndContinue(): Promise<void> {
    await test.step('Agreeing to terms and continuing to the final confirmation step', async () => {
      await this.chkTerms.click();
      await this.btnContinue.click();
    });
  }

  /**
   * Confirms the order.
   */
  @step('Confirming the order')
  async confirmOrder(): Promise<void> {
    await test.step('Confirming the order', async () => {
      await this.btnConfirmOrder.click();
    });
  }

  /**
   * Verifies order success page has loaded.
   */
  @step('Verifying that the order success page has loaded')
  async verifyOrderSuccess(): Promise<void> {
    await test.step('Verifying that the order success page has loaded', async () => {
      await expect(this.page).toHaveURL(/route=checkout\/success/);
    });
  }
}
