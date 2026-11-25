import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from './AlertModal';

/**
 * Component Object responsável pelo rodapé global:
 * Navegação SPA via React Router (preservando estado Redux em memória) e Newsletter.
 */
export class FooterComponent {
  readonly page: Page;
  readonly footer: Locator;
  readonly newsletterInput: Locator;
  readonly newsletterSubmitButton: Locator;
  readonly alert: AlertModal;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer');
    this.newsletterInput = page.getByPlaceholder('Your Mail');
    this.newsletterSubmitButton = page.getByRole('button', { name: 'Send Mail' });
    this.alert = new AlertModal(page);
  }

  async goToCart(): Promise<void> {
    await this.footer.getByRole('link', { name: 'Cart View One' }).click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async goToWishlist(): Promise<void> {
    await this.footer.getByRole('link', { name: 'Wishlist' }).click();
    await expect(this.page).toHaveURL(/\/wishlist/);
  }

  async goToCompare(): Promise<void> {
    await this.footer.getByRole('link', { name: 'Compare' }).click();
    await expect(this.page).toHaveURL(/\/compare/);
  }

  async subscribeNewsletter(email: string): Promise<void> {
    await this.newsletterInput.fill(email);
    await this.newsletterSubmitButton.click();
  }

  async expectNewsletterSuccess(): Promise<void> {
    await expect(this.alert.title).toHaveText('Success');
    await expect(this.alert.text).toContainText('Thank you for your Subscribtion');
    await this.alert.confirmButton.click();
  }
}
