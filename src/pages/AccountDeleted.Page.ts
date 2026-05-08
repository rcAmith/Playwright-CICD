import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage.Page";

export class AccountDeletedPage extends BasePage {
    private getAccountDeletedTextLocator!: Locator;
    private getContinueButtonText!: Locator;

    constructor(page: Page) {
        super(page);
    }

    public async verifyAccountDeleted(): Promise<void> {
        await expect(this.accountDeletedMessage).toBeVisible();
    }

    public get continueButton(): Locator {
        this.getContinueButtonText = this.page.locator("[data-qa='continue-button']");
        return this.getContinueButtonText;

    }

    public get accountDeletedMessage(): Locator {
        this.getAccountDeletedTextLocator = this.page.getByText('Account Deleted!', { exact: true });
        return this.getAccountDeletedTextLocator; 

    }

    public get getContinueButton(): Locator {
        return this.continueButton;
    }

    public get getAccountDeletedText(): Locator {
        return this.accountDeletedMessage;
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/account_deleted');
    }
}

export default AccountDeletedPage;
