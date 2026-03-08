import { test, expect } from '../../fixtures/auth.js';
import { HomePage } from '../../pages/HomePage.js';

test.describe('UI - POM sample', () => {
  test('navigation and interaction using POM', async ({ page, storageState }) => {
    // use storageState by creating a context manually if provided
    if (storageState) {
      await page.context().addCookies([]); // noop - storage already applied if test runner used storageState
    }

    const home = new HomePage(page);
    await home.goto('/');
    await expect(home.isHeaderVisible()).resolves.toBeTruthy();
    await home.clickGetStarted();
    await expect(page.getByRole('heading', { name: /Installation|Getting started/i })).toBeVisible();
  });
});
