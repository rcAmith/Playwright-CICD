import { test, expect } from '../fixtures/pageFixtures';
import { createRegistrationUser } from '../test-data/users';

test.describe("Register User", () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("user can register user with valid credentials", async ({
    accountCreatedPage,
    accountDeletedPage,
    homePage,
    loginPage,
    signupPage
  }) => {
    const registrationUser = createRegistrationUser();

    await expect(loginPage.newUserSignupHeading).toBeVisible();

    await loginPage.signup(registrationUser.signupName, registrationUser.email);

    await expect(signupPage.accountInformationHeading).toBeVisible();

    await signupPage.fillAccountInfoDetails(registrationUser.accountName, registrationUser.password);

    await expect(accountCreatedPage.accountCreatedMessage).toBeVisible({ timeout: 10000 });

    await accountCreatedPage.continueButton.click();

    await expect(homePage.loggedInUser(registrationUser.signupName)).toBeVisible();

    await homePage.clickDeleteAccountButton();

    await accountDeletedPage.verifyAccountDeleted();
  });

});

