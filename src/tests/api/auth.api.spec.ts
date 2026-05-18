import { test, expect } from '../../fixtures/apiFixtures';
import { buildAccountPayload, buildDeletePayload, buildLoginPayload, generateTestEmail } from '../../utils/apiHelpers';

test.describe('API: Verify Login', () => {
  test('@smoke @api Verify login with valid credentials should return 200', async ({ apiService }) => {
    const email = generateTestEmail();
    const password = 'Password123';
    let created = false;

    try {
      const createResponse = await apiService.post('/createAccount', buildAccountPayload(email, password));
      created = createResponse.responseCode === 201;
      apiService.expectResponseCode(createResponse, 201);

      const response = await apiService.post('/verifyLogin', buildLoginPayload(email, password));

      apiService.expectStatus(response, 200);
      apiService.expectResponseCode(response, 200);
      expect(response.message).toContain('User exists');
    } finally {
      if (created) {
        await apiService.delete('/deleteAccount', buildDeletePayload(email, password));
      }
    }
  });

  test('@regression @api Verify login missing email should return 400', async ({ apiService }) => {
    const response = await apiService.post('/verifyLogin', { password: 'Password123' });

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain('email or password parameter is missing');
  });

  test('@regression @api Verify login missing password should return 400', async ({ apiService }) => {
    const response = await apiService.post('/verifyLogin', { email: 'test@example.com' });

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain('email or password parameter is missing');
  });

  test('@regression @api Verify login with invalid credentials should return 404', async ({ apiService }) => {
    const response = await apiService.post('/verifyLogin', buildLoginPayload('nonexistent@example.com', 'wrongpassword'));

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 404);
    expect(response.message).toContain('User not found');
  });

  test('@regression @api DELETE verify login should return 405 Method Not Allowed', async ({ apiService }) => {
    const response = await apiService.delete('/verifyLogin', buildLoginPayload('test@example.com', 'Password123'));

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 405);
    expect(response.message).toContain('not supported');
  });
});
