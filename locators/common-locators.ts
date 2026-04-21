import { Locator, Page } from "@playwright/test";

export class CommonLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.initializeLocators();
  }

  setPage(newPage: Page) {
    this.page = newPage;
    this.initializeLocators();
  }

  getPage() {
    return this.page;
  }

  submitButton!: Locator;
  saveButton!: Locator;
  successMessage!: Locator;
  errorMessage!: Locator;
  clickButton!: Locator;

  initializeLocators() {
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.saveButton = this.page.getByRole("button", { name: "Save" });
    this.successMessage = this.page.locator("xpath=//*[contains(@class,'flash') and contains(@class,'success')]");
    this.errorMessage = this.page.locator("xpath=//*[contains(@class,'flash') and contains(@class,'error')]");
    this.clickButton = this.page.getByRole("button");
  }
}
