import { type Locator, type Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('#product_single_one h3');
    this.addToCartButton = page.locator('#product_single_one').getByRole('link', { name: 'Add To Cart' });
    this.addToWishlistButton = page.locator('#product_single_one').getByRole('link', { name: 'Add To Wishlist' });
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
  }

  async gotoProduct(productId: number): Promise<void> {
    await this.page.goto(`/product-details-one/${productId}`);
  }

  async expectProductLoaded(expectedTitle: string): Promise<void> {
    await expect(this.productTitle).toHaveText(expectedTitle);
  }

  async addToCartAndExpectSuccess(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.swalTitle).toHaveText('Success!');
    await expect(this.swalText).toContainText('Successfully added to your Cart');
  }
}
