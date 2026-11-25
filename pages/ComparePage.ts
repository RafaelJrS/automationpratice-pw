import { type Locator, type Page, expect } from '@playwright/test';
import { FooterComponent } from '../components/FooterComponent';

export class ComparePage {
  readonly page: Page;
  readonly compareTable: Locator;
  readonly addToCartButtons: Locator;
  readonly deleteButtons: Locator;
  readonly emptyCompareHeading: Locator;
  readonly emptyCompareSubheading: Locator;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.compareTable = page.locator('#compare_area table');
    this.addToCartButtons = page.locator('#compare_area td.pro-addtocart a');
    this.deleteButtons = page.locator('#compare_area td.pro-remove button');
    this.emptyCompareHeading = page.locator('#empty_cart_area h2');
    this.emptyCompareSubheading = page.locator('#empty_cart_area h3');
    this.footer = new FooterComponent(page);
  }

  async goto(): Promise<void> {
    await this.footer.goToCompare();
  }

  async gotoDirect(): Promise<void> {
    await this.page.goto('/compare');
  }

  async expectProductInCompare(productName: string): Promise<void> {
    await expect(this.compareTable).toBeVisible();
    await expect(this.compareTable.getByRole('link', { name: productName })).toBeVisible();
  }

  async expectProductNotInCompare(productName: string): Promise<void> {
    await expect(this.compareTable.getByRole('link', { name: productName })).toHaveCount(0);
  }

  async moveFirstCompareProductToCart(): Promise<void> {
    await this.addToCartButtons.first().click();
  }

  async deleteRemainingCompareProduct(): Promise<void> {
    await this.deleteButtons.first().click();
  }

  async expectEmptyCompareMessage(expectedTitle: string, expectedSubtitle: string): Promise<void> {
    await expect(this.emptyCompareHeading).toHaveText(expectedTitle);
    await expect(this.emptyCompareSubheading).toHaveText(expectedSubtitle);
  }
}
