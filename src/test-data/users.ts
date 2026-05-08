export const validLoginUser = {
  email: process.env.LOGIN_EMAIL || '',
  password: process.env.LOGIN_PASSWORD || 'Password123',
  name: process.env.LOGIN_USER_NAME || ''
};

export const invalidLoginUser = {
  email: process.env.INVALID_LOGIN_EMAIL || '',
  password: validLoginUser.password
};

export function createRegistrationUser() {
  return {
    signupName: 'Autobot',
    accountName: 'AutoBotAlpha',
    email: `autobot_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`,
    password: 'Password123'
  };
}
