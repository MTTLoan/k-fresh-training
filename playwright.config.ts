import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

const envFile = `.env.${process.env.ENV || 'qa'}`;
console.log(`Loading environment variables from ${envFile}`);
dotenv.config({
  path: path.resolve(__dirname, 'profiles', envFile),
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: 1,
  use: {
    browserName: 'chromium',
    headless: process.env.HEADLESS ? true : false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
    },

    {
      name: 'webkit',
    },
  ],
});
