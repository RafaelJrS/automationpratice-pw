import { type Locator, type Page, expect } from '@playwright/test';

export class Error404Page {
  readonly page: Page;
  readonly heading404: Locator;
  readonly subheading404: Locator;
  readonly backToHomeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading404 = page.getByRole('heading', { name: '404' });
    this.subheading404 = page.getByRole('heading', {
      name: "We are sorry, the page you've requested is not available",
    });
    this.backToHomeLink = page.getByRole('link', { name: 'Back To Home Page' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/error');
  }

  async expect404PageAndReturnHome(expectedTitle: string, expectedSubtitle: string): Promise<void> {
    await expect(this.heading404).toHaveText(expectedTitle);
    await expect(this.subheading404).toHaveText(expectedSubtitle);
    await this.backToHomeLink.click();
    await expect(this.page).toHaveURL(/automationpratice\.com\.br\/?$/);
  }
}
