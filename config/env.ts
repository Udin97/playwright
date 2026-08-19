import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com/',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://localhost:3000/api',
  username: process.env.TEST_USERNAME ?? '',
  password: process.env.TEST_PASSWORD ?? '',
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 1521),
    serviceName: process.env.DB_SERVICE_NAME ?? '',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
  },
  environment: process.env.ENV ?? 'uat',
};
