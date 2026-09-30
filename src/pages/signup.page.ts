import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export type SignupAccountDetails = {
    password: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    newsletter: boolean;
    offers: boolean;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
};

export class SignupPage extends BasePage {
    private readonly genderMaleRadio = this.page.getByLabel('Mr.');
    private readonly passwordInput = this.page.getByTestId('password');
    private readonly daysSelect = this.page.getByTestId('days');
    private readonly monthsSelect = this.page.getByTestId('months');
    private readonly yearsSelect = this.page.getByTestId('years');
    private readonly newsletterCheckbox = this.page.getByLabel(/newsletter/i);
    private readonly offerCheckbox = this.page.getByLabel(/special offers/i);
    private readonly firstNameInput = this.page.getByTestId('first_name');
    private readonly lastNameInput = this.page.getByTestId('last_name');
    private readonly companyInput = this.page.getByTestId('company');
    private readonly addressInput = this.page.getByTestId('address');
    private readonly countrySelect = this.page.getByTestId('country');
    private readonly stateInput = this.page.getByTestId('state');
    private readonly cityInput = this.page.getByTestId('city');
    private readonly zipCodeInput = this.page.getByTestId('zipcode');
    private readonly mobileNumberInput = this.page.getByTestId('mobile_number');
    private readonly createAccountButton = this.page.getByTestId('create-account');

    constructor(page: Page) {
        super(page);
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/signup');
    }

    public get accountInformationHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Enter Account Information' });
    }
    public get existingEmailError(): Locator {
        return this.page.getByText('Email Address already exist!', { exact: true });
    }
    public async fillAccountInfoDetails(details: SignupAccountDetails): Promise<void> {
        await this.genderMaleRadio.check();
        await this.passwordInput.fill(details.password);
        await this.daysSelect.selectOption({ value: details.birthDay });
        await this.monthsSelect.selectOption({ value: details.birthMonth });
        await this.yearsSelect.selectOption({ value: details.birthYear });
        await this.newsletterCheckbox.setChecked(details.newsletter);
        await this.offerCheckbox.setChecked(details.offers);
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.companyInput.fill(details.company);
        await this.addressInput.fill(details.address);
        await this.countrySelect.selectOption({ value: details.country });
        await this.stateInput.fill(details.state);
        await this.cityInput.fill(details.city);
        await this.zipCodeInput.fill(details.zipcode);
        await this.mobileNumberInput.fill(details.mobileNumber);
        await this.createAccountButton.click();
    }
}

export default SignupPage;
