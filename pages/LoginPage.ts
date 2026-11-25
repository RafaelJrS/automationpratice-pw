import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly invalidInputError: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;
  readonly swalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#user');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#btnLogin');
    this.rememberMeCheckbox = page.locator('#materialUnchecked');
    this.invalidInputError = page.locator('.invalid_input');
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
    this.swalConfirmButton = page.locator('.swal2-confirm');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess(email: string): Promise<void> {
    await expect(this.swalTitle).toHaveText('Login realizado');
    await expect(this.swalText).toHaveText(`Olá, ${email}`);
    await this.swalConfirmButton.click();
    await expect(this.page).toHaveURL(/\/my-account/);
  }

  async expectLoginError(expectedMessage: string): Promise<void> {
    await expect(this.invalidInputError).toHaveText(expectedMessage);
  }
}
