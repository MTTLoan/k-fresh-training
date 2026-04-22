/**
 *
 */
export class Constants {
  static readonly ENV = process.env.ENV || 'production';
  static readonly BASE_URL =
    process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly PRODUCT_PAGE_URL =
    process.env.PRODUCT_PAGE_URL ||
    'https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=62&search=macbook+pro';
  static readonly LOGIN_URL =
    process.env.LOGIN_URL ||
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/login';
  static readonly REGISTER_URL =
    process.env.REGISTER_URL ||
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/register';
  static readonly EMPTY_CART_MESSAGE =
    process.env.EMPTY_CART_MESSAGE || 'Your shopping cart is empty!';
  static readonly EMPTY_CART_TOTAL = process.env.EMPTY_CART_TOTAL || '$0.00';
  static readonly ADD_TO_CART_SUCCESS_MESSAGE = 'Success: You have added';
  static readonly CART_MODIFIED_SUCCESS_MESSAGE =
    'Success: You have modified your shopping cart!';
}
