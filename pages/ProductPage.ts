import { type Locator, type Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly addToCompareButton: Locator;
  readonly minusQuantityButton: Locator;
  readonly plusQuantityButton: Locator;
  readonly quantityInput: Locator;
  readonly sizeSelect: Locator;
  readonly greenColorRadio: Locator;
  readonly greenColorSwatch: Locator;
  readonly productDetailsTwoTitle: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;
  readonly swalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('#product_single_one h3');
    this.addToCartButton = page.locator('#product_single_one').getByRole('link', { name: 'Add To Cart' });
    this.addToWishlistButton = page.locator('#product_single_one').getByRole('link', { name: 'Add To Wishlist' });
    this.addToCompareButton = page.locator('#product_single_one').getByRole('link', { name: 'Add To Compare' });
    this.minusQuantityButton = page.locator('#product_count_form_two button').first();
    this.plusQuantityButton = page.locator('#product_count_form_two button').last();
    this.quantityInput = page.locator('#product_count_form_two input[type="number"]');
    this.sizeSelect = page.locator('#product_single_one select.customs_sel_box');
    this.greenColorRadio = page.locator('#modal-product-color-green3');
    this.greenColorSwatch = page.locator('label[for="modal-product-color-green3"] span.product-color-green');
    this.productDetailsTwoTitle = page.locator('#product_single_two h3');
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
    this.swalConfirmButton = page.locator('.swal2-confirm');
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

  async selectVariationsAndAddToCart(sizeLabel: string): Promise<void> {
    await this.sizeSelect.selectOption({ label: sizeLabel });
    await this.greenColorSwatch.click();
    await expect(this.greenColorRadio).toBeChecked();
    await this.plusQuantityButton.click();
    await expect(this.quantityInput).toHaveValue('2');
    await this.addToCartAndExpectSuccess();
  }

  async gotoProductLayoutTwoAndAddToCart(productId: number, expectedTitle: string): Promise<void> {
    await this.page.goto(`/product-details-two/${productId}`);
    await expect(this.productDetailsTwoTitle).toHaveText(expectedTitle);
    await this.page.locator('#product_single_two').getByRole('link', { name: 'Add To Cart' }).click();
    await expect(this.swalTitle).toHaveText('Success!');
    await expect(this.swalText).toContainText('Successfully added to your Cart');
  }

  async addToWishlistAndExpectModal(expectedTitle: string, expectedMessage: string): Promise<void> {
    await this.addToWishlistButton.click();
    await expect(this.swalTitle).toHaveText(expectedTitle);
    await expect(this.swalText).toHaveText(expectedMessage);
    await this.swalConfirmButton.click();
  }

  async addToCompareAndExpectModal(expectedTitle: string, expectedMessage: string): Promise<void> {
    await this.addToCompareButton.click();
    await expect(this.swalTitle).toHaveText(expectedTitle);
    await expect(this.swalText).toContainText(expectedMessage);
  }

  async decreaseQuantityBelowMinimumAndExpectWarning(title: string, message: string): Promise<void> {
    await this.minusQuantityButton.click();
    await expect(this.swalTitle).toHaveText(title);
    await expect(this.swalText).toHaveText(message);
    await this.swalConfirmButton.click();
  }
}
