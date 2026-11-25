import { type Locator, type Page, expect } from '@playwright/test';

export class WishlistPage {
  readonly page: Page;
  readonly wishlistTable: Locator;
  readonly emptyWishlistHeading: Locator;
  readonly trashIcons: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wishlistTable = page.locator('#Wishlist_area table');
    this.emptyWishlistHeading = page.locator('#empty_cart_area h2');
    this.trashIcons = page.locator('#Wishlist_area tbody tr .product_remove i.fa-trash');
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
  }

  async goto(): Promise<void> {
    await this.page.locator('footer').getByRole('link', { name: 'Wishlist' }).click();
    await expect(this.page).toHaveURL(/\/wishlist/);
  }

  async gotoDirect(): Promise<void> {
    await this.page.goto('/wishlist');
  }

  async expectProductInWishlist(productName: string): Promise<void> {
    await expect(this.wishlistTable).toBeVisible();
    await expect(this.wishlistTable.getByRole('link', { name: productName })).toBeVisible();
  }

  async expectProductNotInWishlist(productName: string): Promise<void> {
    await expect(this.wishlistTable.getByRole('link', { name: productName })).toHaveCount(0);
  }

  async removeProductFromWishlist(productName: string): Promise<void> {
    const row = this.wishlistTable.locator('tbody tr', { hasText: productName });
    await row.locator('.product_remove i.fa-trash').click();
  }

  async moveProductToCartFromWishlist(productName: string): Promise<void> {
    const row = this.wishlistTable.locator('tbody tr', { hasText: productName });
    await row.getByRole('button', { name: 'Add to cart' }).click();
    await expect(this.swalTitle).toHaveText('Success!');
    await expect(this.swalText).toContainText('Successfully added to your Cart');
  }

  async removeAllProductsFromWishlist(): Promise<void> {
    const count = await this.trashIcons.count();
    for (let i = 0; i < count; i++) {
      await this.trashIcons.first().click();
    }
  }

  async expectEmptyWishlistMessage(expectedTitle: string): Promise<void> {
    await expect(this.emptyWishlistHeading).toHaveText(expectedTitle);
  }
}
