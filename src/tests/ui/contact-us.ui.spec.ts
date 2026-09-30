import { test, expect } from "../../fixtures/pageFixtures";
import { testConfig } from "../../config/testConfig";

test.describe("Contact Us", () => {

  test.beforeEach(async ({ contactUsPage }) => {
    await contactUsPage.navigate();
  });

  test("@smoke @ui user can fill contact us form", async ({
    contactUsPage,
    homePage,
  }) => {
    await expect(contactUsPage.getInTouchHeadingLocator).toBeVisible();
    await contactUsPage.fillContactUsForm(
      "Test User",
      `test_user${Date.now()}@gmail.com`,
      "This is a test message from the contact us form.",
      "General Inquiry",
    );

    await contactUsPage.clickSubmitAndAcceptPopup();
    await expect(contactUsPage.successMessage).toBeVisible();    
    await contactUsPage.clickHomePageLink();
    const curentURL = await homePage.getCurrentURL();
    expect(curentURL).toMatch(testConfig.baseURL);
  });

});
