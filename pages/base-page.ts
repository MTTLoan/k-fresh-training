import { test as baseTest, type Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { CartPage } from './cart-page';
import { ProductPage } from './product-page';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';
import { CheckoutPage } from './checkout-page';

export const test = baseTest.extend<{
  cartPage: CartPage;
  commonPage: CommonPage;
  productPage: ProductPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  checkoutPage: CheckoutPage;
}>({
  cartPage: async ({ page, context }, use) => {
    const instance = new CartPage(page);
    context.on('page', (newPage: Page) => {
      instance.setPage(newPage);
    });
    await use(instance);
  },

  commonPage: async ({ page, context }, use) => {
    const instance = new CommonPage(page);
    context.on('page', (newPage: Page) => {
      instance.setPage(newPage);
    });
    await use(instance);
  },

  productPage: async ({ page, context }, use) => {
    const instance = new ProductPage(page);
    context.on('page', (newPage: Page) => {
      instance.setPage(newPage);
    });
    await use(instance);
  },

  loginPage: async ({ page, context }, use) => {
    const instance = new LoginPage(page);
    context.on('page', (newPage: Page) => {
      instance.setPage(newPage);
    });
    await use(instance);
  },

  registerPage: async ({ page, context }, use) => {
    const instance = new RegisterPage(page);
    context.on('page', (newPage: Page) => {
      instance.setPage(newPage);
    });
    await use(instance);
  },

  checkoutPage: async ({ page, context }, use) => {
    const instance = new CheckoutPage(page);
    context.on('page', (newPage: Page) => {
      instance.setPage(newPage);
    });
    await use(instance);
  },
});
