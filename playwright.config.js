// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment file based on PLAYWRIGHT_ENV (dev|staging|prod) or NODE_ENV
const envName = process.env.PLAYWRIGHT_ENV || process.env.NODE_ENV || 'dev';
const envPath = path.resolve(process.cwd(), `.env.${envName}`);
dotenv.config({ path: envPath });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry policy */
  retries: process.env.CI ? 2 : (process.env.PLAYWRIGHT_RETRIES ? parseInt(process.env.PLAYWRIGHT_RETRIES, 10) : 0),
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL || process.env.PLAYWRIGHT_BASE_URL || undefined,

    /* Global timeout for each action (like click, fill). */
    actionTimeout: process.env.PLAYWRIGHT_ACTION_TIMEOUT ? parseInt(process.env.PLAYWRIGHT_ACTION_TIMEOUT, 10) : 5000,

    /* Default navigation timeout */
    navigationTimeout: process.env.PLAYWRIGHT_NAVIGATION_TIMEOUT ? parseInt(process.env.PLAYWRIGHT_NAVIGATION_TIMEOUT, 10) : 30000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Per-test timeout (ms) */
  timeout: process.env.PLAYWRIGHT_TEST_TIMEOUT ? parseInt(process.env.PLAYWRIGHT_TEST_TIMEOUT, 10) : 60000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

