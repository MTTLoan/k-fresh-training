import { expect, Page, test } from '@playwright/test';
import { RegisterLocators } from '../locators/register-locators';
import { CommonPage } from './common-page';
import { User } from '../models/User';
import { step } from '../utilities/logging';

/**
 * Class representing register page
 */
export class RegisterPage extends RegisterLocators {
  commonPage: CommonPage;

  /**
   * Creates an instance of RegisterPage
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Fills in the registration form with the provided user details and submits it.
   * @param user
   */
  @step(
    'Fills in the registration form with the provided user details and submits it',
  )
  async register(user: User): Promise<void> {
    await test.step('Fills in the registration form with the provided user details and submits it', async () => {
      await this.inputFirstName.fill(user.firstName);
      await this.inputLastName.fill(user.lastName);
      await this.inputEmail.fill(user.email);
      await this.inputTelephone.fill(user.telephone);
      await this.inputPassword.fill(user.password);
      await this.inputPasswordConfirm.fill(user.password);
      await this.chkPrivacyPolicy.check();
      await this.btnContinue.click();
    });
  }

  /**
   * Verifies that the registration was successful by checking for the success page content.
   */
  @step(
    'Verifies that the registration was successful by checking for the success page content.',
  )
  async verifyRegistrationSuccess(): Promise<void> {
    await test.step('Verifies that the registration was successful by checking for the success page content.', async () => {
      await expect(this.page).toHaveURL(/route=account\/success/);
    });
  }
}
