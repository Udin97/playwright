import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForVisible(locator: Locator, timeout = 10_000) {
    await expect(locator).toBeVisible({ timeout });
  }

  async click(locator: Locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
  }
}
