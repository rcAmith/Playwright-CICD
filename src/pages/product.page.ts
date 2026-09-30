import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly searchInput = this.page.getByRole("textbox", {
    name: "Search Product",
  });
  private readonly searchButton = this.page.locator("#submit_search");

  private readonly productCards = this.page.locator(".product-image-wrapper");
  private readonly productNames = this.page.locator(".productinfo p");

  async getDisplayedProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getDisplayedProductCount(): Promise<number> {
    return await this.productCards.count();
  }
  public async navigate(): Promise<void> {
    await this.navigateGeneral("/products");
  }
  public async searchForProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
export default ProductPage;
