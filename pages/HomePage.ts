import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from '../components/AlertModal';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly newsletterInput: Locator;
  readonly newsletterSubmitButton: Locator;
  readonly searchOpenIcon: Locator;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly alert: AlertModal;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: /login/i });
    this.registerLink = page.getByRole('link', { name: /cadastro/i });
    this.newsletterInput = page.getByPlaceholder('Your Mail');
    this.newsletterSubmitButton = page.getByRole('button', { name: 'Send Mail' });
    this.searchOpenIcon = page.locator('a.search_width').first();
    this.searchInput = page.getByPlaceholder('type keyword(s) here');
    this.searchSubmitButton = page.getByRole('button', { name: 'Search' });
    this.alert = new AlertModal(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async expectHomeLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/automationpratice\.com\.br/);
    await expect(this.loginLink).toBeVisible();
  }

  async goToLogin(): Promise<void> {
    await this.loginLink.click();
    await expect(this.page).toHaveURL(/\/login/);
  }

  async goToRegister(): Promise<void> {
    await this.registerLink.click();
    await expect(this.page).toHaveURL(/\/register/);
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
}
