// BasePage for common page helpers
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path) {
    return this.page.goto(path);
  }

  async title() {
    return this.page.title();
  }
}
