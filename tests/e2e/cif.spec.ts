import { test, expect } from '../../fixtures/auth.fixture';
import { CifPage } from '../../pages/modules/CifPage';

test.describe('E2E: CIF (Customer Information File)', () => {
  test('search for an existing customer', async ({ authenticatedPage }) => {
    const cifPage = new CifPage(authenticatedPage.page);
    await cifPage.searchCustomer('CIF00012345');

    await expect(authenticatedPage.page.getByText('CIF00012345')).toBeVisible();
  });

  test('create a new customer record', async ({ authenticatedPage }) => {
    const cifPage = new CifPage(authenticatedPage.page);
    await cifPage.createCustomer();

    await expect(authenticatedPage.page).toHaveURL(/cif\/new/);
  });
});
