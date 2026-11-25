import { type Locator, type Page, expect } from '@playwright/test';

export class OrderTrackingPage {
  readonly page: Page;
  readonly orderIdInput: Locator;
  readonly billingEmailInput: Locator;
  readonly trackButton: Locator;
  readonly orderCompletedHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderIdInput = page.locator('#order_ID');
    this.billingEmailInput = page.locator('#billing_email');
    this.trackButton = page.getByRole('button', { name: 'Track' });
    this.orderCompletedHeading = page.getByRole('heading', { name: 'Your order is completed!' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/order-tracking');
  }

  async trackOrderAndExpectCompleted(
    orderId: string,
    billingEmail: string,
    expectedHeading: string
  ): Promise<void> {
    await this.orderIdInput.fill(orderId);
    await this.billingEmailInput.fill(billingEmail);
    await this.trackButton.click();
    await expect(this.page).toHaveURL(/\/order-complete/);
    await expect(this.orderCompletedHeading).toHaveText(expectedHeading);
  }

  async submitEmptyTrackingAndExpectBlocked(): Promise<void> {
    await this.trackButton.click();
    await expect(this.page.locator('#order_ID:invalid')).toBeVisible();
    await expect(this.page).toHaveURL(/\/order-tracking/);
  }
}
