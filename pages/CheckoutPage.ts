import { type Locator, type Page, expect } from '@playwright/test';
import { type BillingDetails } from '../test-data/ecommerce.data';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyNameInput: Locator;
  readonly emailInput: Locator;
  readonly countrySelect: Locator;
  readonly citySelect: Locator;
  readonly zipCodeInput: Locator;
  readonly fullAddressInput: Locator;
  readonly additionalNotesInput: Locator;
  readonly saveBillingButton: Locator;
  readonly billingSuccessMessage: Locator;
  readonly placeOrderButton: Locator;
  readonly orderSuccessHeading: Locator;
  readonly orderSuccessSubheading: Locator;
  readonly errorLabels: Locator;
  readonly mobileBankingRadio: Locator;
  readonly paypalRadio: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#fname');
    this.lastNameInput = page.locator('#lname');
    this.companyNameInput = page.locator('#cname');
    this.emailInput = page.locator('#email');
    this.countrySelect = page.locator('#country');
    this.citySelect = page.locator('#city');
    this.zipCodeInput = page.locator('#zip');
    this.fullAddressInput = page.locator('#faddress');
    this.additionalNotesInput = page.locator('#messages');
    this.saveBillingButton = page.getByRole('button', { name: 'Save' });
    this.billingSuccessMessage = page.getByRole('heading', {
      name: 'Billings Information registred with success!',
    });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.orderSuccessHeading = page.getByRole('heading', { name: 'Order success!' });
    this.orderSuccessSubheading = page.getByRole('heading', {
      name: 'Congrats! Your order was created with sucess!',
    });
    this.errorLabels = page.locator('.errorLabel');
    this.mobileBankingRadio = page.locator('#javascript');
    this.paypalRadio = page.locator('#css');
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout-one');
  }

  async fillAndSaveBillingInformation(data: BillingDetails): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyNameInput.fill(data.companyName);
    await this.emailInput.fill(data.email);
    await this.countrySelect.selectOption({ label: data.country });
    await this.citySelect.selectOption({ label: data.city });
    await this.zipCodeInput.fill(data.zipCode);
    await this.fullAddressInput.fill(data.fullAddress);
    await this.additionalNotesInput.fill(data.additionalNotes);
    await this.saveBillingButton.click();
  }

  async expectBillingSavedSuccess(): Promise<void> {
    await expect(this.billingSuccessMessage).toBeVisible();
  }

  async placeOrderAndExpectSuccess(): Promise<void> {
    await this.placeOrderButton.click();
    await expect(this.orderSuccessHeading).toBeVisible();
    await expect(this.orderSuccessSubheading).toBeVisible();
  }

  async clickPlaceOrderWithoutBillingAndExpectError(expectedMessage: string): Promise<void> {
    await this.placeOrderButton.click();
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
  }

  async clickSaveEmptyBillingAndExpectErrors(expectedMessages: string[]): Promise<void> {
    await this.saveBillingButton.click();
    for (const msg of expectedMessages) {
      await expect(this.page.getByText(msg)).toBeVisible();
    }
  }

  async expectInvalidEmailErrorOnly(expectedError: string): Promise<void> {
    await expect(this.page.getByText(expectedError)).toBeVisible();
    await expect(this.billingSuccessMessage).toHaveCount(0);
  }

  async selectAlternativePaymentMethodsAndPlaceOrder(): Promise<void> {
    await this.mobileBankingRadio.check();
    await expect(this.mobileBankingRadio).toBeChecked();
    await this.paypalRadio.check();
    await expect(this.paypalRadio).toBeChecked();
    await this.placeOrderAndExpectSuccess();
  }
}
