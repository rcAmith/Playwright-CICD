import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
    private readonly contactUsLink = this.page.getByRole('link', { name: /Contact us/i });
    private readonly deleteAccountLink = this.page.getByRole('link', { name: /Delete Account/ });

    constructor(page: Page) {
        super(page);
    }

    public loggedInUser(userName: string): Locator {
        return this.page.getByText(`Logged in as ${userName}`, { exact: true });
    }

    public async clickDeleteAccountButton(): Promise<void> {
        await this.deleteAccountLink.click();
    }

    public async navigate(): Promise<void> {
        await super.navigate();
    }
    public async clickContactUs(){
        await this.contactUsLink.click();
    }
}

export default HomePage;
