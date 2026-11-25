import { type Locator, type Page, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly invalidNameInput: Locator;
  readonly swalTitle: Locator;
  readonly swalText: Locator;
  readonly swalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.phoneInput = page.getByPlaceholder('Phone');
    this.subjectInput = page.getByPlaceholder('Subject');
    this.messageInput = page.getByPlaceholder('Message');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.invalidNameInput = page.locator('input[name="name"]:invalid');
    this.swalTitle = page.locator('#swal2-title');
    this.swalText = page.locator('#swal2-html-container');
    this.swalConfirmButton = page.locator('.swal2-confirm');
  }

  async goto(): Promise<void> {
    await this.page.goto('/contact-two');
  }

  async submitEmptyAndExpectBlocked(): Promise<void> {
    await this.submitButton.click();
    await expect(this.invalidNameInput).toBeVisible();
  }

  async fillAndSubmitContactForm(
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    expectedTitle: string,
    expectedText: string
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.submitButton.click();
    await expect(this.swalTitle).toHaveText(expectedTitle);
    await expect(this.swalText).toHaveText(expectedText);
    await this.swalConfirmButton.click();
  }
}
