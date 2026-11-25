import { type Locator, type Page, expect } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';
import { FooterComponent } from '../components/FooterComponent';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: /login/i });
    this.registerLink = page.getByRole('link', { name: /cadastro/i });
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
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
    await this.footer.subscribeNewsletter(email);
  }

  async expectNewsletterSuccess(): Promise<void> {
    await this.footer.expectNewsletterSuccess();
  }

  async searchProductAndExpectSuccess(
    keyword: string,
    expectedTitle: string,
    expectedText: string
  ): Promise<void> {
    await this.header.searchProductAndExpectSuccess(keyword, expectedTitle, expectedText);
  }
}
