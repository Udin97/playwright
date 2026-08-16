import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../config/selectors';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/');
  }

  async login(username: string, password: string) {
    await this.fill(this.page.locator(selectors.login.usernameInput), username);
    await this.fill(this.page.locator(selectors.login.passwordInput), password);
    await this.click(this.page.locator(selectors.login.submitButton));
  }

  get errorMessage() {
    return this.page.locator(selectors.login.errorMessage);
  }
}
