import { Locator, Page } from '@playwright/test';
import { BasePageContract } from './base-page.interface';
import { testConfig } from '../config/testConfig';

export class BasePage implements BasePageContract {
  protected readonly baseURL: string = testConfig.baseURL;

  constructor(protected page: Page) {
  }

  public async navigate(): Promise<void> {
    await this.page.goto(this.baseURL);
  }

  public async navigateGeneral(path: string): Promise<void> {
    await this.page.goto(new URL(path, this.baseURL).toString());
  }

  public getElementByText(text: string): Locator {
    return this.page.getByText(text);
  }
  public async getCurrentURL(): Promise<string> {
    return this.page.url();
  }
}
