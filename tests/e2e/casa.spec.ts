import { test, expect } from '../../fixtures/auth.fixture';
import accounts from '../../data/accounts.json';

test.describe('E2E: CASA (Current Account Savings Account)', () => {
  test('view CASA account balance', async ({ authenticatedPage }) => {
    await authenticatedPage.openModule('CASA');

    await expect(authenticatedPage.page.getByText(accounts.savingsAccount.accountNumber)).toBeVisible();
  });
});
