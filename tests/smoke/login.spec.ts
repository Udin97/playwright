import { test, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { env } from '../../config/env';

test.describe('Smoke: Login', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(env.username, env.password);

    await expect(page).toHaveURL(/inventory/);
  });

  test('user sees an error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('invalid.user', 'wrong-password');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test ('user sees an error when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('', env.password);

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test ('user sees an error when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(env.username, '');

    await expect(loginPage.errorMessage).toBeVisible();
  }); 
  
  test('user sees an error message "Epic sadface: Sorry, this user has been locked out."', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('locked_out_user', 'password');

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
