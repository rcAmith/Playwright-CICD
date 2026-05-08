// base-test.ts
import { chromium, type Browser, type Page, type TestInfo } from '@playwright/test';
import { IBaseTest } from './base.interface';
import LoginPage from '../pages/Login.Page';
import HomePage from '../pages/Home.Page';
import SignupPage from "../pages/Signup.Page";
import AccountCreatedPage from "../pages/AccountCreated.Page";
import AccountDeletedPage from "../pages/AccountDeleted.Page";

const isCI = !!process.env.CI;

export class BaseTest implements IBaseTest {
  // Definite assignment assertions (!) to tell TypeScript these will be initialized later
  browser!: Browser;
  page!: Page;
  loginPage!: LoginPage;
  homePage!: HomePage;
  signupPage!: SignupPage;
  accountcreatedPage!: AccountCreatedPage;
  accountdeletedPage!: AccountDeletedPage;

  // Setup method to initialize the browser, page, and page objects
  async setup() {
    // Launch browser and create new page instance
    this.browser = await chromium.launch({
      headless: isCI,
      slowMo: isCI ? 0 : 50
    });
    this.page = await this.browser.newPage();

    // Initialize page objects
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.signupPage = new SignupPage(this.page);
    this.accountcreatedPage = new AccountCreatedPage(this.page);
    this.accountdeletedPage = new AccountDeletedPage(this.page);
  }

  // Teardown method to close the browser after tests
  async teardown(testInfo?: TestInfo) {
    if (testInfo && testInfo.status !== testInfo.expectedStatus && this.page && !this.page.isClosed()) {
      try {
        const screenshotPath = testInfo.outputPath('failure-screenshot.png');
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        await testInfo.attach('failure screenshot', {
          path: screenshotPath,
          contentType: 'image/png'
        });
      } catch (error) {
        await testInfo.attach('screenshot error', {
          body: String(error),
          contentType: 'text/plain'
        });
      }
    }

    if (this.browser) {
      await this.browser.close(); // Ensure browser is closed only if it exists
    }
  }
}
