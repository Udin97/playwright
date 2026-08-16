import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { selectors } from '../../config/selectors';

export class CifPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async searchCustomer(cifNumber: string) {
    await this.fill(this.page.locator(selectors.cif.searchInput), cifNumber);
    await this.page.keyboard.press('Enter');
  }

  async createCustomer() {
    await this.click(this.page.locator(selectors.cif.createButton));
  }
}
