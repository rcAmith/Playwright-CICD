import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountDeletedPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async verifyAccountDeleted(): Promise<void> {
        await expect(this.accountDeletedMessage).toBeVisible();
    }

    public get continueButton(): Locator {
        return this.page.locator("[data-qa='continue-button']");
    }

    public get accountDeletedMessage(): Locator {
        return this.page.getByText('Account Deleted!', { exact: true });
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/account_deleted');
    }
}

export default AccountDeletedPage;
