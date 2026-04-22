import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class CartLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  cartButton!: Locator;
  cartDrawerMessage!: Locator;
  cartDrawerTotalLabel!: Locator;
  editCartButton!: Locator;
  mainCartMessage!: Locator;
  cartModifiedSuccessMessage!: Locator;
  checkoutButton!: Locator;

  initializeLocators() {
    super.initializeLocators();
    this.cartButton = this.page.locator("(//div[@class='cart-icon'])[1]");
    this.cartDrawerMessage = this.page.locator("//div[contains(@class,'widget-total')]");
    this.cartDrawerTotalLabel = this.page.locator("//td[text()='Total:']/following-sibling::td/strong");
    this.editCartButton = this.page.getByRole("button", { name: "Edit cart" });
    this.mainCartMessage = this.page.locator("//h1[contains(@class,'page-title')]/following-sibling::p");
    this.cartModifiedSuccessMessage = this.page.locator("//div[@class='alert alert-success alert-dismissible']").first();
    this.checkoutButton = this.page.getByRole('link', { name: 'Checkout', exact: true })
  }

  productRow(productName: string): Locator {
    return this.page.locator(`(//td/a[text()='${productName}']/../..)[1]`);
  }

  removeButton(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//button[@title="Remove"]`,
    );
  }

  updateButton(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//button[@title="Update"]`,
    );
  }

  quantityInput(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//input[starts-with(@name,'quantity')]`,
    );
  }

  totalLabel(productName: string): Locator {
    return this.page.locator(
      `(//td/a[text()='${productName}']/../..//td)[last()]`,
    );
  }
}
