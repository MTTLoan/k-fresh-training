import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "node:path";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  reporter: "html",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: 1,
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
