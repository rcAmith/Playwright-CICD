import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    private readonly loginEmailInput = this.page.locator("[data-qa='login-email']");
    private readonly loginPasswordInput = this.page.locator("[data-qa='login-password']");
    private readonly loginButton = this.page.locator("[data-qa='login-button']");
    private readonly signupNameInput = this.page.locator("[data-qa='signup-name']");
    private readonly signupEmailInput = this.page.locator("[data-qa='signup-email']");
    private readonly signupButton = this.page.locator("[data-qa='signup-button']");

    constructor(page: Page) {
        super(page);
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/login');
    }

    public get newUserSignupHeading(): Locator {
        return this.page.getByText('New User Signup!', { exact: true });
    }

    public get invalidLoginError(): Locator {
        return this.page.getByText('Your email or password is incorrect!', { exact: true });
    }

    public async login(email: string, password: string): Promise<void> {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    public async signup(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
}

export default LoginPage;
