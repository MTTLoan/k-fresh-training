import { test } from "../../pages/base-page";
import { Product } from "../../models/Product";
import { User } from "../../models/User";
import { Constants } from "../../utilities/constants";
import { getEnvProduct } from "../../data/data-loader";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../../pages/register-page";
import { Order } from "../../models/Order";

const product: Product = getEnvProduct();
const user: User = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  telephone: faker.phone.number({ style: "national" }),
  password: faker.internet.password({ length: 12 }),
};
const order: Order = {
  company: faker.company.name(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  postcode: faker.location.zipCode(),
  country: "United States",
  region: "California",
};

test.describe("Cart Tests", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const registerPage = new RegisterPage(page);

    await registerPage.commonPage.goto(Constants.REGISTER_URL);
    await registerPage.register(
      user.firstName,
      user.lastName,
      user.email,
      user.telephone,
      user.password,
    );
    await registerPage.verifyRegistrationSuccess();

    await context.close();
  });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.commonPage.goto(Constants.LOGIN_URL);
    await loginPage.login(user.email, user.password);
    await loginPage.verifyLoginSuccess();
    await loginPage.commonPage.goto(Constants.BASE_URL);
  });

  test("TC01 - Verify Empty Cart", async ({ cartPage }) => {
    await cartPage.commonPage.goto(Constants.BASE_URL);
    await cartPage.clickCartButton();
    await cartPage.verifyDrawerCartIsEmpty(
      Constants.EMPTY_CART_MESSAGE,
      Constants.EMPTY_CART_TOTAL,
    );
    await cartPage.clickEditCart();
    await cartPage.verifyMainCartIsEmpty(Constants.EMPTY_CART_MESSAGE);
  });

  test("TC02 - Add Product to Cart", async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.increaseQuantity(product.quantity);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Constants.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyCartContainsProduct(product.name);
    await cartPage.verifyProductQuantity(product.name, product.quantity);
  });

  test("TC03 - Remove Product from Cart", async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Constants.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyCartContainsProduct(product.name);
    await cartPage.clickRemoveProduct(product.name);
    await cartPage.verifyProductRemovedFromCart(product.name);
  });

  test("TC04 - Update Product Quantity", async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Constants.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyCartContainsProduct(product.name);
    await cartPage.updateProductQuantity(product.name, product.quantity);
    await cartPage.verifyCartModifiedSuccessMessage(
      Constants.CART_MODIFIED_SUCCESS_MESSAGE,
    );
    await cartPage.verifyProductQuantity(product.name, product.quantity);
    await cartPage.verifyCartRowLineTotal(product.name, product.totalPrice);
  });

  test("TC05 - Update Product Quantity to 0 (Remove via Quantity)", async ({
    productPage,
    cartPage,
  }) => {
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Constants.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyCartContainsProduct(product.name);
    await cartPage.updateProductQuantity(product.name, 0);
    await cartPage.verifyProductRemovedFromCart(product.name);
  });

  test("TC06 - E2E Add Checkout Process", async ({ productPage, cartPage, checkoutPage }) => {
      await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
      await productPage.increaseQuantity(product.quantity);
      await productPage.clickAddToCart();
      await productPage.verifyAddToCartSuccessMessage(Constants.ADD_TO_CART_SUCCESS_MESSAGE);
      await productPage.clickViewCartLink();
      await cartPage.verifyCartPageLoaded();
      await cartPage.verifyCartContainsProduct(product.name);
      await cartPage.clickCheckoutButton();
      await checkoutPage.fillBillingDetails(
        user.firstName,
        user.lastName,
        order.company,
        order.address,
        order.city,
        order.postcode,
        order.country,
        order.region
      );
      await checkoutPage.agreeTermsAndContinue();
      await checkoutPage.confirmOrder();
      await checkoutPage.verifyOrderSuccess();
    });
});