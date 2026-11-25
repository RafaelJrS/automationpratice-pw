import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly newsletterInput: Locator;
  readonly newsletterSubmitButton: Locator;
  readonly swalTitle: Locator;
  readonly swalHtmlContainer: Locator;
  readonly swalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: /login/i });
    this.registerLink = page.getByRole('link', { name: /cadastro/i });
    this.newsletterInput = page.getByPlaceholder('Your Mail');
    this.newsletterSubmitButton = page.getByRole('button', { name: 'Send Mail' });
    this.swalTitle = page.locator('#swal2-title');
    this.swalHtmlContainer = page.locator('#swal2-html-container');
    this.swalConfirmButton = page.locator('.swal2-confirm');
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
    await expect(this.swalTitle).toHaveText('Success');
    await expect(this.swalHtmlContainer).toContainText('Thank you for your Subscribtion');
    await this.swalConfirmButton.click();
  }
}
