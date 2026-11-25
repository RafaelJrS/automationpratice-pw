import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { WishlistPage } from '../pages/WishlistPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { OrderTrackingPage } from '../pages/OrderTrackingPage';
import { ComparePage } from '../pages/ComparePage';

type PagesFixture = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  wishlistPage: WishlistPage;
  myAccountPage: MyAccountPage;
  orderTrackingPage: OrderTrackingPage;
  comparePage: ComparePage;
};

export const test = base.extend<PagesFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  wishlistPage: async ({ page }, use) => {
    await use(new WishlistPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  orderTrackingPage: async ({ page }, use) => {
    await use(new OrderTrackingPage(page));
  },
  comparePage: async ({ page }, use) => {
    await use(new ComparePage(page));
  },
});

export { expect } from '@playwright/test';
