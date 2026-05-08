import { test, expect } from '../fixtures/pageFixtures';
import { invalidLoginUser, validLoginUser } from '../test-data/users';

test.describe("Login User", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('user can login with valid credentials', async ({ loginPage, homePage }) => {
        await loginPage.login(validLoginUser.email, validLoginUser.password);
    
        const isLoggedIn = homePage.loggedInUser(validLoginUser.name);

        await expect(isLoggedIn).toBeVisible();
    });

    test('user can login with invalid credentials', async ({ loginPage }) => {
        await loginPage.login(invalidLoginUser.email, invalidLoginUser.password);

        const hasError = loginPage.invalidLoginError;

        await expect(hasError).toBeVisible();
    });

});
