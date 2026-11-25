import { type Locator, type Page, expect } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly sortBySelect: Locator;
  readonly firstProductCard: Locator;
  readonly firstAddToCartButton: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortBySelect = page.locator('select.customs_sel_box').nth(1);
    this.firstProductCard = page.locator('.product_wrappers_one').first();
    this.firstAddToCartButton = this.firstProductCard.locator('button.add-to-cart');
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
  }

  async goto(): Promise<void> {
    await this.page.goto('/shop');
  }

  async sortProductsAndAddFirstToCart(sortLabel: string): Promise<void> {
    await this.sortBySelect.selectOption({ label: sortLabel });
    await this.firstAddToCartButton.dispatchEvent('click');
    await expect(this.swalTitle).toHaveText('Success!');
    await expect(this.swalText).toContainText('Successfully added to your Cart');
  }
}
