import { request, APIRequestContext } from '@playwright/test';
import { env } from '../config/env';

export class ApiClient {
  private context: APIRequestContext | null = null;

  async init(token?: string) {
    this.context = await request.newContext({
      baseURL: env.apiBaseUrl,
      extraHTTPHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return this.context;
  }

  async get(endpoint: string) {
    if (!this.context) throw new Error('ApiClient not initialized. Call init() first.');
    return this.context.get(endpoint);
  }

  async post(endpoint: string, data: Record<string, unknown>) {
    if (!this.context) throw new Error('ApiClient not initialized. Call init() first.');
    return this.context.post(endpoint, { data });
  }

  async dispose() {
    await this.context?.dispose();
  }
}
