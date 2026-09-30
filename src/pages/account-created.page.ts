import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
 
export class AccountCreatedPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public get accountCreatedMessage(): Locator {
        return this.page.getByRole('heading', { name: 'Account Created!' });
    }
    
    public get continueButton(): Locator {
        return this.page.getByTestId('continue-button');
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/account_created');
    }
}

export default AccountCreatedPage;
