import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class ProductLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  increaseQuantityButton!: Locator;
  quantityInput!: Locator;
  addToCartButton!: Locator;
  successAlert!: Locator;
  viewCartLink!: Locator;

  initializeLocators() {
    super.initializeLocators();
    this.increaseQuantityButton = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.quantityInput = this.page.locator("(//input[@name='quantity'])[1]");
    this.addToCartButton = this.page.getByRole("button", {
      name: "Add to Cart",
    });
    this.successAlert = this.page.getByRole("alert");
    this.viewCartLink = this.page
      .getByRole("link", { name: "View Cart" })
      .first();
  }
}
