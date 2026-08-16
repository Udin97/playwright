import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { selectors } from '../../config/selectors';

export class FundTransferPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async transfer(fromAccount: string, toAccount: string, amount: string) {
    await this.fill(this.page.locator(selectors.fundTransfer.fromAccountInput), fromAccount);
    await this.fill(this.page.locator(selectors.fundTransfer.toAccountInput), toAccount);
    await this.fill(this.page.locator(selectors.fundTransfer.amountInput), amount);
    await this.click(this.page.locator(selectors.fundTransfer.submitButton));
  }
}
