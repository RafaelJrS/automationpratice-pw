import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from '../components/AlertModal';

export class ShopPage {
  readonly page: Page;
  readonly sortBySelect: Locator;
  readonly firstProductCard: Locator;
  readonly firstAddToCartButton: Locator;
  readonly alert: AlertModal;

  constructor(page: Page) {
    this.page = page;
    this.sortBySelect = page.locator('select.customs_sel_box').nth(1);
    this.firstProductCard = page.locator('.product_wrappers_one').first();
    this.firstAddToCartButton = this.firstProductCard.locator('button.add-to-cart');
    this.alert = new AlertModal(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/shop');
  }

  async sortProductsAndAddFirstToCart(sortLabel: string): Promise<void> {
    await this.sortBySelect.selectOption({ label: sortLabel });
    await this.firstAddToCartButton.dispatchEvent('click');
    await expect(this.alert.title).toHaveText('Success!');
    await expect(this.alert.text).toContainText('Successfully added to your Cart');
  }
}
