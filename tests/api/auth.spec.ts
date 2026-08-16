import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api-client';
import { env } from '../../config/env';

test.describe('API: Auth', () => {
  let apiClient: ApiClient;

  test.beforeEach(async () => {
    apiClient = new ApiClient();
    await apiClient.init();
  });

  test.afterEach(async () => {
    await apiClient.dispose();
  });

  test('login returns an access token', async () => {
    const response = await apiClient.post('/auth/login', {
      username: env.username,
      password: env.password,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('accessToken');
  });
});
