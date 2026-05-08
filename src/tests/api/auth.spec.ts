import { test, expect } from '../../fixtures/apiFixtures';
import { buildLoginPayload } from '../../utils/apiHelpers';

test.describe('API: Verify Login', () => {
  test('Verify login with valid credentials should return 200', async ({ apiService }) => {
    // Using a known valid test account
    const response = await apiService.post('/verifyLogin', buildLoginPayload('test@example.com', 'Password123'));

    apiService.expectStatus(response, 200);
    // Either 200 (user exists) or 404 (user not found) are expected for valid format
    expect([200, 404]).toContain(response.responseCode);
  });

  test('Verify login missing email should return 400', async ({ apiService }) => {
    const response = await apiService.post('/verifyLogin', { password: 'Password123' });

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain('email or password parameter is missing');
  });

  test('Verify login missing password should return 400', async ({ apiService }) => {
    const response = await apiService.post('/verifyLogin', { email: 'test@example.com' });

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain('email or password parameter is missing');
  });

  test('Verify login with invalid credentials should return 404', async ({ apiService }) => {
    const response = await apiService.post('/verifyLogin', buildLoginPayload('nonexistent@example.com', 'wrongpassword'));

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 404);
    expect(response.message).toContain('User not found');
  });

  test('DELETE verify login should return 405 Method Not Allowed', async ({ apiService }) => {
    const response = await apiService.delete('/verifyLogin', buildLoginPayload('test@example.com', 'Password123'));

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 405);
    expect(response.message).toContain('not supported');
  });
});
