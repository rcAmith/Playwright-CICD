import { test as base, expect } from '@playwright/test';
import AccountCreatedPage from '../pages/account-created.page';
import AccountDeletedPage from '../pages/account-deleted.page';
import HomePage from '../pages/home.page';
import LoginPage from '../pages/login.page';
import SignupPage from '../pages/signup.page';
import ContactUsPage from '../pages/contact-us.page';
import ProductPage from '../pages/product.page';

type PageFixtures = {
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  productPage: ProductPage;
  contactUsPage: ContactUsPage;
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
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
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
