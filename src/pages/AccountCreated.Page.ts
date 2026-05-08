import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage.Page";
 
export class AccountCreatedPage extends BasePage {
    private getAccountCreatedTextLocator!: Locator;
    private getContinueButtonText!: Locator;

    constructor(page: Page) {
        super(page);
    }

    public get accountCreatedMessage(): Locator {
        this.getAccountCreatedTextLocator = this.page.getByText('Account Created!', { exact: true });
        return this.getAccountCreatedTextLocator; 

    }
    
    public get continueButton(): Locator {
        this.getContinueButtonText = this.page.locator("[data-qa='continue-button']");
        return this.getContinueButtonText;

    }

    public get getAccountCreatedText(): Locator {
        return this.accountCreatedMessage;
    }

    public get getContinueButton(): Locator {
        return this.continueButton;
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/account_created');
    }

}

export default AccountCreatedPage;
