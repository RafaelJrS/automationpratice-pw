import { type Locator, type Page, expect } from '@playwright/test';

export class AccountEditPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly rePasswordInput: Locator;
  readonly updateInfoButton: Locator;
  readonly invalidFirstNameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#f_name');
    this.lastNameInput = page.getByPlaceholder('Dhoe');
    this.emailInput = page.locator('#email_address');
    this.currentPasswordInput = page.locator('#current_password');
    this.newPasswordInput = page.locator('#new_password');
    this.rePasswordInput = page.locator('#re_password');
    this.updateInfoButton = page.getByRole('button', { name: 'Update Information' });
    this.invalidFirstNameInput = page.locator('#f_name:invalid');
  }

  async goto(): Promise<void> {
    await this.page.goto('/account-edit');
  }

  async fillAndUpdateAccount(
    firstName: string,
    lastName: string,
    email: string,
    currentPass: string,
    newPass: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.currentPasswordInput.fill(currentPass);
    await this.newPasswordInput.fill(newPass);
    await this.rePasswordInput.fill(newPass);
    await this.updateInfoButton.click();
    await expect(this.page).toHaveURL(/\/vendor\/vendor-profile/);
  }

  async submitEmptyAndExpectBlocked(): Promise<void> {
    await this.updateInfoButton.click();
    await expect(this.invalidFirstNameInput).toBeVisible();
    await expect(this.page).toHaveURL(/\/account-edit/);
  }
}
