import type { SignupAccountDetails } from '../pages/signup.page';

export type RegistrationUser = {
  signupName: string;
  accountName: string;
  email: string;
  password: string;
};

export function createRegistrationUser(overrides: Partial<RegistrationUser> = {}): RegistrationUser {
  return {
    signupName: 'Autobot',
    accountName: 'AutoBotAlpha',
    email: `autobot_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`,
    password: 'Password123',
    ...overrides
  };
}

export function createSignupAccountDetails(
  user: RegistrationUser,
  overrides: Partial<SignupAccountDetails> = {}
): SignupAccountDetails {
  return {
    password: user.password,
    birthDay: '30',
    birthMonth: '1',
    birthYear: '1994',
    newsletter: true,
    offers: true,
    firstName: user.accountName,
    lastName: 'Bot',
    company: 'Cairo',
    address: 'Cairo, EG',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90002',
    mobileNumber: '323123123123',
    ...overrides
  };
}
