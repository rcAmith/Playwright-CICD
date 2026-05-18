import { Locator } from '@playwright/test';

export interface BasePageContract {
  navigate(): Promise<void>;

  navigateGeneral(path: string): Promise<void>;

  getElementByText(text: string): Locator;
}
