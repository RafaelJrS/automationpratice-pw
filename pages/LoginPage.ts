import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from '../components/AlertModal';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly invalidInputError: Locator;
  readonly alert: AlertModal;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#user');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#btnLogin');
    this.rememberMeCheckbox = page.locator('#materialUnchecked');
    this.invalidInputError = page.locator('.invalid_input');
    this.alert = new AlertModal(page);
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
    await expect(this.alert.title).toHaveText('Login realizado');
    await expect(this.alert.text).toHaveText(`Olá, ${email}`);
    await this.alert.confirmButton.click();
    await expect(this.page).toHaveURL(/\/my-account/);
  }

  async expectLoginError(expectedMessage: string): Promise<void> {
    await expect(this.invalidInputError).toHaveText(expectedMessage);
  }
}
