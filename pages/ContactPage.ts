import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from '../components/AlertModal';

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly invalidNameInput: Locator;
  readonly alert: AlertModal;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.phoneInput = page.getByPlaceholder('Phone');
    this.subjectInput = page.getByPlaceholder('Subject');
    this.messageInput = page.getByPlaceholder('Message');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.invalidNameInput = page.locator('input[name="name"]:invalid');
    this.alert = new AlertModal(page);
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
    await expect(this.alert.title).toHaveText(expectedTitle);
    await expect(this.alert.text).toHaveText(expectedText);
    await this.alert.confirmButton.click();
  }
}
