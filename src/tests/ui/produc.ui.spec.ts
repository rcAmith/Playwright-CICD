import { test, expect } from "../../fixtures/pageFixtures";
import { testConfig } from "../../config/testConfig";

test.describe("Product", () => {
  test.beforeEach(async ({ productPage }) => {
    await productPage.navigate();
  });

  test("@smoke @ui user can search for products", async ({ productPage }) => {
    await productPage.searchForProduct("T-shirt");
    const productNames = await productPage.getDisplayedProductNames();
    const expectedProducts = [
      "Pure Cotton V-Neck T-Shirt",
      "Green Side Placket Detail T-Shirt",
      "Premium Polo T-Shirts",
    ];
    expect (await productPage.getDisplayedProductCount()).toBe(expectedProducts.length);

    for (const product of expectedProducts) {
      expect(productNames).toContain(product);
    }
  });
});
