import { Locator, Page } from "@playwright/test";
import { BasePage} from "./BasePage.Page";

export class HomePage extends BasePage {
    private getDeleteAccountButton!: Locator;

    constructor(page: Page) {
        super(page);
    }

    public loggedInUser(userName: string): Locator {
        return this.page.getByText(`Logged in as ${userName}`, { exact: true });
    }

    public async clickDeleteAccountButton(): Promise<void> {
        this.getDeleteAccountButton = this.page.getByRole('link', { name: 'Delete Account' });
        await this.getDeleteAccountButton.click();
    }

    public async navigate(): Promise<void> {
        await super.navigate();
    }
}

export default HomePage;
