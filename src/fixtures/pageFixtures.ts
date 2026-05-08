import { test as base, expect } from '@playwright/test';
import AccountCreatedPage from '../pages/AccountCreated.Page';
import AccountDeletedPage from '../pages/AccountDeleted.Page';
import HomePage from '../pages/Home.Page';
import LoginPage from '../pages/Login.Page';
import SignupPage from '../pages/Signup.Page';

type PageFixtures = {
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  _failureScreenshot: void;
};

export const test = base.extend<PageFixtures>({
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  accountDeletedPage: async ({ page }, use) => {
    await use(new AccountDeletedPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  _failureScreenshot: [async ({ page }, use, testInfo) => {
    await use();

    if (testInfo.status === testInfo.expectedStatus || page.isClosed()) {
      return;
    }

    try {
      const screenshotPath = testInfo.outputPath('failure-screenshot.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
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
  }, { auto: true }]
});

export { expect };
