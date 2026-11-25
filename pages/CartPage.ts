import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly proceedToCheckoutLink: Locator;
  readonly clearCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('#cart_area_one table');
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to Checkout' });
    this.clearCartButton = page.getByRole('button', { name: 'Clear cart' });
  }

  async goto(): Promise<void> {
    await this.page.locator('footer').getByRole('link', { name: 'Cart View One' }).click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.cartTable).toBeVisible();
    await expect(this.cartTable.getByRole('link', { name: productName })).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutLink.click();
    await expect(this.page).toHaveURL(/\/checkout-one/);
  }
}
