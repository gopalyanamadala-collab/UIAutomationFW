import base from '@playwright/test';
import fs from 'fs';
import path from 'path';

const { test: baseTest, expect } = base;

/**
 * Custom fixtures that provide `authToken` and `storageState` for tests.
 * - Reads credentials from env vars (AUTH_USER/AUTH_PASS) and BASE_URL.
 * - Performs API login to get a token and creates a `storageState` file for UI tests.
 */
export const test = baseTest.extend({
  authToken: async ({ request }, use) => {
    const loginUrl = process.env.API_LOGIN || `${process.env.BASE_URL || ''}/api/login`;
    const res = await request.post(loginUrl, { data: { username: process.env.AUTH_USER || 'user', password: process.env.AUTH_PASS || 'pass' } });
    const body = await res.json();
    await use(body?.token || null);
  },

  storageState: async ({ browser, authToken }, use) => {
    // Create a browser context and set localStorage/session based on token
    const storageFile = path.join(process.cwd(), '.auth', `storageState-${Date.now()}.json`);
    try {
      fs.mkdirSync(path.dirname(storageFile), { recursive: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      const baseUrl = process.env.BASE_URL || 'about:blank';
      await page.goto(baseUrl);
      if (authToken) {
        // store token in localStorage (adjust key as application expects)
        await page.evaluate((token) => localStorage.setItem('auth_token', token), authToken);
      }
      await context.storageState({ path: storageFile });
      await context.close();
      await use(storageFile);
    } finally {
      // leave storage file for re-use (tests should cleanup if needed)
    }
  }
});

export { expect };
