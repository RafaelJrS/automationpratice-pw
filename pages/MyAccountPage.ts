import { type Locator, type Page, expect } from '@playwright/test';
import { AlertModal } from '../components/AlertModal';

export class MyAccountPage {
  readonly page: Page;
  readonly dashboardMenu: Locator;
  readonly ordersTab: Locator;
  readonly downloadsTab: Locator;
  readonly addressesTab: Locator;
  readonly accountDetailsTab: Locator;
  readonly logoutLink: Locator;
  readonly updateAccountLink: Locator;
  readonly alert: AlertModal;

  constructor(page: Page) {
    this.page = page;
    this.dashboardMenu = page.locator('#my-account_area .dashboard-list');
    this.ordersTab = this.dashboardMenu.getByRole('link', { name: 'Orders' });
    this.downloadsTab = this.dashboardMenu.getByRole('link', { name: 'Downloads' });
    this.addressesTab = this.dashboardMenu.getByRole('link', { name: 'Addresses' });
    this.accountDetailsTab = this.dashboardMenu.getByRole('link', { name: 'Account details' });
    this.logoutLink = this.dashboardMenu.getByRole('link', { name: /logout/i });
    this.updateAccountLink = page.getByRole('link', { name: 'Update Account' });
    this.alert = new AlertModal(page);
  }

  async navigateToOrdersAndExpectLoaded(): Promise<void> {
    await this.ordersTab.click();
    await expect(this.page).toHaveURL(/\/my-account\/customer-order/);
    await expect(this.page.getByRole('heading', { name: 'Orders' })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: 'Completed' })).toBeVisible();
  }

  async navigateToDownloads(): Promise<void> {
    await this.downloadsTab.click();
    await expect(this.page).toHaveURL(/\/my-account\/customer-download/);
  }

  async navigateToAddresses(): Promise<void> {
    await this.addressesTab.click();
    await expect(this.page).toHaveURL(/\/my-account\/customer-address/);
  }

  async navigateToAccountDetailsAndExpectLoaded(): Promise<void> {
    await this.accountDetailsTab.click();
    await expect(this.page).toHaveURL(/\/my-account\/customer-account-details/);
    await expect(this.updateAccountLink).toBeVisible();
  }

  async logoutAndExpectSuccess(expectedTitle: string, expectedText: string): Promise<void> {
    await this.logoutLink.click();
    await expect(this.alert.title).toHaveText(expectedTitle);
    await expect(this.alert.text).toHaveText(expectedText);
    await this.alert.confirmButton.click();
    await expect(this.page).toHaveURL(/\/login/);
  }
}
