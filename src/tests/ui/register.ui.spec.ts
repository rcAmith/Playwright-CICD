import { test, expect } from "../../fixtures/pageFixtures";
import {
  createRegistrationUser,
  createSignupAccountDetails,
} from "../../test-data/accountFactory";
import { validLoginUser } from "../../test-data/users";

test.describe("Register User", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("@smoke @ui user can register user with valid credentials", async ({
    accountCreatedPage,
    accountDeletedPage,
    homePage,
    loginPage,
    signupPage,
  }) => {
    const registrationUser = createRegistrationUser();
    const accountDetails = createSignupAccountDetails(registrationUser);
    let cleanupNeeded = false;
    let accountDeleted = false;

    try {
      await expect(loginPage.newUserSignupHeading).toBeVisible();

      await loginPage.signup(
        registrationUser.signupName,
        registrationUser.email,
      );

      await expect(signupPage.accountInformationHeading).toBeVisible();

      await signupPage.fillAccountInfoDetails(accountDetails);

      await expect(accountCreatedPage.accountCreatedMessage).toBeVisible({
        timeout: 10000,
      });
      cleanupNeeded = true;

      await accountCreatedPage.continueButton.click();

      await expect(
        homePage.loggedInUser(registrationUser.signupName),
      ).toBeVisible();

      await homePage.clickDeleteAccountButton();

      await accountDeletedPage.verifyAccountDeleted();
      accountDeleted = true;
    } finally {
      if (cleanupNeeded && !accountDeleted) {
        try {
          if (
            await accountCreatedPage.continueButton.isVisible({ timeout: 2000 })
          ) {
            await accountCreatedPage.continueButton.click();
          }

          if (
            await homePage
              .loggedInUser(registrationUser.signupName)
              .isVisible({ timeout: 5000 })
          ) {
            await homePage.clickDeleteAccountButton();
            await accountDeletedPage.verifyAccountDeleted();
          }
        } catch (error) {
          console.warn(
            `Cleanup failed for ${registrationUser.email}: ${String(error)}`,
          );
        }
      }
    }
  });
  test("@smoke @ui user cannot register user with existing email", async ({
    homePage,
    loginPage,
    signupPage,
  }) => {
    const registrationUser = createRegistrationUser({
      email: validLoginUser.email,
    });
    await expect(loginPage.newUserSignupHeading).toBeVisible();

    await loginPage.signup(registrationUser.signupName, registrationUser.email);

    await expect(signupPage.existingEmailError).toBeVisible();
  });
});
