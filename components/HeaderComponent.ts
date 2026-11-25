import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from './AlertModal';

/**
 * Component Object responsável pelos elementos globais do cabeçalho:
 * Modal de Busca (Search) e Mini-Carrinho Lateral (Offcanvas Drawer).
 */
export class HeaderComponent {
  readonly page: Page;
  readonly searchOpenIcon: Locator;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly offcanvasCartTrigger: Locator;
  readonly offcanvasCartDrawer: Locator;
  readonly offcanvasSubtotalValue: Locator;
  readonly offcanvasCheckoutLink: Locator;
  readonly alert: AlertModal;

  constructor(page: Page) {
    this.page = page;
    this.searchOpenIcon = page.locator('a.search_width').first();
    this.searchInput = page.getByPlaceholder('type keyword(s) here');
    this.searchSubmitButton = page.getByRole('button', { name: 'Search' });
    this.offcanvasCartTrigger = page.locator('header .fa-shopping-bag').first();
    this.offcanvasCartDrawer = page.locator('#offcanvas-add-cart');
    this.offcanvasSubtotalValue = this.offcanvasCartDrawer.locator('.offcanvas-cart-total-price-value');
    this.offcanvasCheckoutLink = this.offcanvasCartDrawer.getByRole('link', { name: 'Checkout' });
    this.alert = new AlertModal(page);
  }

  async searchProductAndExpectSuccess(
    keyword: string,
    expectedTitle: string,
    expectedText: string
  ): Promise<void> {
    await this.searchOpenIcon.click();
    await this.searchInput.fill(keyword);
    await this.searchSubmitButton.click();
    await expect(this.alert.title).toHaveText(expectedTitle);
    await expect(this.alert.text).toHaveText(expectedText);
    await this.alert.confirmButton.click();
    await expect(this.page).toHaveURL(/\/shop/);
  }

  async openOffcanvasRemoveItemAndGoToCheckout(
    productName: string,
    initialSubtotal: string,
    updatedSubtotal: string
  ): Promise<void> {
    await this.offcanvasCartTrigger.click();
    await expect(this.offcanvasSubtotalValue).toHaveText(initialSubtotal);
    const item = this.offcanvasCartDrawer.locator('li.offcanvas-wishlist-item-single', {
      hasText: productName,
    });
    await item.locator('a.offcanvas-wishlist-item-delete').click();
    await expect(this.offcanvasSubtotalValue).toHaveText(updatedSubtotal);
    await this.offcanvasCheckoutLink.click();
    await expect(this.page).toHaveURL(/\/checkout-one/);
  }
}
