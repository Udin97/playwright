import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { env } from '../config/env';

type AuthFixtures = {
  authenticatedPage: DashboardPage;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(env.username, env.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.waitForVisible(dashboardPage.welcomeBanner);

    await use(dashboardPage);
  },
});

export { expect };
