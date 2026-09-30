import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    private readonly loginEmailInput = this.page.getByTestId('login-email');
    private readonly loginPasswordInput = this.page.getByTestId('login-password');
    private readonly loginButton = this.page.getByTestId('login-button');
    private readonly signupNameInput = this.page.getByTestId('signup-name');
    private readonly signupEmailInput = this.page.getByTestId('signup-email');
    private readonly signupButton = this.page.getByTestId('signup-button');
    private readonly logoutButton = this.page.getByRole('link', { name: /Logout/ });

    constructor(page: Page) {
        super(page);
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/login');
    }

    public get newUserSignupHeading(): Locator {
        return this.page.getByRole('heading', { name: 'New User Signup!' });
    }

    public get invalidLoginError(): Locator {
        return this.page.getByText('Your email or password is incorrect!', { exact: true });
    }

    public async login(email: string, password: string): Promise<void> {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }
    public async logout(){
        await   this.logoutButton.click();
    }

    public async signup(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
}

export default LoginPage;
