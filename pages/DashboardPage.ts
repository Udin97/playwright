import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../config/selectors';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get welcomeBanner() {
    return this.page.locator(selectors.dashboard.welcomeBanner);
  }

  async openModule(name: string) {
    await this.click(this.page.locator(selectors.dashboard.navMenu).getByText(name, { exact: false }));
  }
}
