import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from '../components/AlertModal';
import { HeaderComponent } from '../components/HeaderComponent';
import { FooterComponent } from '../components/FooterComponent';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly cartTwoTable: Locator;
  readonly proceedToCheckoutLink: Locator;
  readonly clearCartButton: Locator;
  readonly emptyCartHeading: Locator;
  readonly emptyCartSubheading: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly alert: AlertModal;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('#cart_area_one table');
    this.cartTwoTable = page.locator('#cart_area_two table');
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to Checkout' });
    this.clearCartButton = page.getByRole('button', { name: 'Clear cart' });
    this.emptyCartHeading = page.locator('#empty_cart_area h2');
    this.emptyCartSubheading = page.locator('#empty_cart_area h3');
    this.couponInput = page.getByPlaceholder('Coupon code');
    this.applyCouponButton = page.getByRole('button', { name: 'Apply coupon' });
    this.alert = new AlertModal(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }

  async goto(): Promise<void> {
    await this.footer.goToCart();
  }

  async gotoDirect(): Promise<void> {
    await this.page.goto('/cart');
  }

  async gotoCartTwoDirect(): Promise<void> {
    await this.page.goto('/cartTwo');
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.cartTable).toBeVisible();
    await expect(this.cartTable.getByRole('link', { name: productName })).toBeVisible();
  }

  async updateProductQuantityAndExpectTotal(
    productName: string,
    newQty: string,
    expectedTotal: string
  ): Promise<void> {
    const row = this.cartTable.locator('tbody tr', { hasText: productName });
    await row.locator('td.product_quantity input[type="number"]').fill(newQty);
    await expect(row.locator('td.product_total')).toHaveText(expectedTotal);
  }

  async incrementProductInCartTwoAndExpectTotal(
    productName: string,
    expectedTotal: string
  ): Promise<void> {
    const row = this.cartTwoTable.locator('tbody tr', { hasText: productName });
    await row.locator('td.product_quantity i.fa-plus').click();
    await expect(row.locator('td.product_total')).toHaveText(expectedTotal);
  }

  async openOffcanvasRemoveItemAndGoToCheckout(
    productName: string,
    initialSubtotal: string,
    updatedSubtotal: string
  ): Promise<void> {
    await this.header.openOffcanvasRemoveItemAndGoToCheckout(
      productName,
      initialSubtotal,
      updatedSubtotal
    );
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
    await expect(this.alert.title).toHaveText(expectedTitle);
    await expect(this.alert.text).toHaveText(expectedText);
    await this.alert.confirmButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutLink.click();
    await expect(this.page).toHaveURL(/\/checkout-one/);
  }
}
