import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountDeletedPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async verifyAccountDeleted(): Promise<void> {
        await this.accountDeletedMessage.waitFor({ state: 'visible' });
    }

    public get continueButton(): Locator {
        return this.page.getByTestId('continue-button');
    }

    public get accountDeletedMessage(): Locator {
        return this.page.getByRole('heading', { name: 'Account Deleted!' });
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/account_deleted');
    }
}

export default AccountDeletedPage;
