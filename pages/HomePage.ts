import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: /login/i });
    this.registerLink = page.getByRole('link', { name: /cadastro/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async expectHomeLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/automationpratice\.com\.br/);
    await expect(this.loginLink).toBeVisible();
  }
}
