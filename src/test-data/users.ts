export const validLoginUser = {
  email: process.env.LOGIN_EMAIL || '',
  password: process.env.LOGIN_PASSWORD || 'Password123',
  name: process.env.LOGIN_USER_NAME || ''
};

export const invalidLoginUser = {
  email: 'invalid-user@example.com',
  password: process.env.INVALID_LOGIN_PASSWORD || 'InvalidPassword123'
};
