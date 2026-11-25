import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly proceedToCheckoutLink: Locator;
  readonly clearCartButton: Locator;
  readonly emptyCartHeading: Locator;
  readonly emptyCartSubheading: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;
  readonly swalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('#cart_area_one table');
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to Checkout' });
    this.clearCartButton = page.getByRole('button', { name: 'Clear cart' });
    this.emptyCartHeading = page.locator('#empty_cart_area h2');
    this.emptyCartSubheading = page.locator('#empty_cart_area h3');
    this.couponInput = page.getByPlaceholder('Coupon code');
    this.applyCouponButton = page.getByRole('button', { name: 'Apply coupon' });
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
    this.swalConfirmButton = page.locator('.swal2-confirm');
  }

  async goto(): Promise<void> {
    await this.page.locator('footer').getByRole('link', { name: 'Cart View One' }).click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async gotoDirect(): Promise<void> {
    await this.page.goto('/cart');
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.cartTable).toBeVisible();
    await expect(this.cartTable.getByRole('link', { name: productName })).toBeVisible();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const row = this.cartTable.locator('tbody tr', { hasText: productName });
    await row.locator('.product_remove i.fa-trash').click();
  }

  async expectProductNotInCart(productName: string): Promise<void> {
    await expect(this.cartTable.getByRole('link', { name: productName })).toHaveCount(0);
  }

  async clearAllCart(): Promise<void> {
    await this.clearCartButton.click();
  }

  async expectEmptyCartMessage(expectedTitle: string, expectedSubtitle: string): Promise<void> {
    await expect(this.emptyCartHeading).toHaveText(expectedTitle);
    await expect(this.emptyCartSubheading).toHaveText(expectedSubtitle);
  }

  async applyCouponAndExpectError(code: string, expectedTitle: string, expectedText: string): Promise<void> {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
    await expect(this.swalTitle).toHaveText(expectedTitle);
    await expect(this.swalText).toHaveText(expectedText);
    await this.swalConfirmButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutLink.click();
    await expect(this.page).toHaveURL(/\/checkout-one/);
  }
}
