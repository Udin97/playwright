import { test as base } from '@playwright/test';
import users from '../data/users.json';
import accounts from '../data/accounts.json';

type TestDataFixtures = {
  users: typeof users;
  accounts: typeof accounts;
};

export const test = base.extend<TestDataFixtures>({
  users: async ({}, use) => {
    await use(users);
  },
  accounts: async ({}, use) => {
    await use(accounts);
  },
});
