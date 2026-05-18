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
    private readonly genderMaleRadio = this.page.locator('#id_gender1');
    private readonly passwordInput = this.page.locator('#password');
    private readonly daysSelect = this.page.locator('#days');
    private readonly monthsSelect = this.page.locator('#months');
    private readonly yearsSelect = this.page.locator('#years');
    private readonly newsletterCheckbox = this.page.locator('#newsletter');
    private readonly offerCheckbox = this.page.locator('#optin');
    private readonly firstNameInput = this.page.locator('#first_name');
    private readonly lastNameInput = this.page.locator('#last_name');
    private readonly companyInput = this.page.locator("[data-qa='company']");
    private readonly addressInput = this.page.locator("[data-qa='address']");
    private readonly countrySelect = this.page.locator("[data-qa='country']");
    private readonly stateInput = this.page.locator("[data-qa='state']");
    private readonly cityInput = this.page.locator("[data-qa='city']");
    private readonly zipCodeInput = this.page.locator("[data-qa='zipcode']");
    private readonly mobileNumberInput = this.page.locator("[data-qa='mobile_number']");
    private readonly createAccountButton = this.page.locator("[data-qa='create-account']");

    constructor(page: Page) {
        super(page);
    }

    public async navigate(): Promise<void> {
        await this.navigateGeneral('/signup');
    }

    public get accountInformationHeading(): Locator {
        return this.page.getByText('Enter Account Information', { exact: true });
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
