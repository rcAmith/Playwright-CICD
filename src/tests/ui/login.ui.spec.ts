import { test, expect } from "../../fixtures/pageFixtures";
import { validateRequiredEnvVars } from "../../config/envValidation";
import { invalidLoginUser, validLoginUser } from "../../test-data/users";

test.describe("Login User", () => {
  test.beforeAll(() => {
    validateRequiredEnvVars(
      ["LOGIN_EMAIL", "LOGIN_PASSWORD", "LOGIN_USER_NAME"],
      "UI login tests",
    );
  });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("@smoke @ui user can login with valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await loginPage.login(validLoginUser.email, validLoginUser.password);

    const isLoggedIn = homePage.loggedInUser(validLoginUser.name);

    await expect(isLoggedIn).toBeVisible();
  });

  test("@smoke @ui user can logout", async ({ loginPage, homePage }) => {
    await loginPage.login(validLoginUser.email, validLoginUser.password);

    const isLoggedIn = homePage.loggedInUser(validLoginUser.name);

    await expect(isLoggedIn).toBeVisible();

    await loginPage.logout();
    
    const currentURL = await loginPage.getCurrentURL();
    expect(currentURL).toMatch(/\/login/);
  });

  test("@regression @ui user can login with invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.login(invalidLoginUser.email, invalidLoginUser.password);

    const hasError = loginPage.invalidLoginError;

    await expect(hasError).toBeVisible();
  });
});
