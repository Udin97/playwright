import { test, expect } from '../../fixtures/auth.fixture';
import { FundTransferPage } from '../../pages/modules/FundTransferPage';
import accounts from '../../data/accounts.json';

test.describe('E2E: Fund Transfer', () => {
  test('transfer funds between two CASA accounts', async ({ authenticatedPage }) => {
    const fundTransferPage = new FundTransferPage(authenticatedPage.page);
    await fundTransferPage.transfer(
      accounts.savingsAccount.accountNumber,
      accounts.currentAccount.accountNumber,
      '100.00'
    );

    await expect(authenticatedPage.page.getByText('Transfer successful')).toBeVisible();
  });
});
