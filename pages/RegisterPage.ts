import { type Locator, type Page, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly errorLabel: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;
  readonly swalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#user');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.locator('#btnRegister');
    this.errorLabel = page.locator('#errorMessageFirstName');
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
    this.swalConfirmButton = page.locator('.swal2-confirm');
  }

  async goto(): Promise<void> {
    await this.page.goto('/register');
  }

  async registerUser(name: string, email: string, password: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }

  async expectRegisterSuccess(name: string): Promise<void> {
    await expect(this.swalTitle).toHaveText('Cadastro realizado!');
    await expect(this.swalText).toHaveText(`Bem-vindo ${name}`);
    await this.swalConfirmButton.click();
    await expect(this.page).toHaveURL(/\/my-account/);
  }

  async expectRegisterError(expectedMessage: string): Promise<void> {
    await expect(this.errorLabel).toHaveText(expectedMessage);
  }
}
