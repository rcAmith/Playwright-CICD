import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
 
export class AccountCreatedPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public get accountCreatedMessage(): Locator {
        return this.page.getByText('Account Created!', { exact: true });
    }
    
    public get continueButton(): Locator {
        return this.page.locator("[data-qa='continue-button']");
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/account_created');
    }
}

export default AccountCreatedPage;
