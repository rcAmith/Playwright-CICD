import { Locator, Page } from '@playwright/test';
import { IBasePage } from './IBasePage.Interface';
import { testConfig } from '../config/testConfig';

export class BasePage implements IBasePage {
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
}
