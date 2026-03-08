import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.header = page.locator('header');
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  async isHeaderVisible() {
    return this.header.isVisible();
  }
}
