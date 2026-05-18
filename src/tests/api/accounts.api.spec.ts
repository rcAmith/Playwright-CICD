import { test, expect } from '../../fixtures/apiFixtures';
import { generateTestEmail, buildAccountPayload, buildUpdatePayload, buildDeletePayload } from '../../utils/apiHelpers';

test.describe('API: Account Management', () => {
  let testEmail: string;

  test.beforeEach(async () => {
    testEmail = generateTestEmail();
  });

  test('@regression @api Create account should return 201', async ({ apiService }) => {
    const payload = buildAccountPayload(testEmail);
    let created = false;

    try {
      const response = await apiService.post('/createAccount', payload);
      created = response.responseCode === 201;

      apiService.expectStatus(response, 200);
      apiService.expectResponseCode(response, 201);
      expect(response.message).toContain('User created');
    } finally {
      if (created) {
        await apiService.delete('/deleteAccount', buildDeletePayload(testEmail));
      }
    }
  });

  test('@regression @api Create account with duplicate email should return 400', async ({ apiService }) => {
    const payload = buildAccountPayload('test@example.com');
    const response = await apiService.post('/createAccount', payload);

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain('Email already exists');
  });

  test('@regression @api Get user details by email should return 200', async ({ apiService }) => {
    const response = await apiService.get('/getUserDetailByEmail', { email: 'test@example.com' });

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 200);
    expect(response.user).toBeDefined();
    expect(response.user.email).toBe('test@example.com');
  });

  test('@regression @api Get user details with missing email should return 400', async ({ apiService }) => {
    const response = await apiService.get('/getUserDetailByEmail', {});

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain('email parameter is missing');
  });

  test('@regression @api Delete account should return 200', async ({ apiService }) => {
    // First create account
    const createPayload = buildAccountPayload(testEmail);
    const createResponse = await apiService.post('/createAccount', createPayload);
    expect(createResponse.responseCode).toBe(201);

    // Then delete it
    const deletePayload = buildDeletePayload(testEmail);
    const deleteResponse = await apiService.delete('/deleteAccount', deletePayload);

    apiService.expectStatus(deleteResponse, 200);
    apiService.expectResponseCode(deleteResponse, 200);
    expect(deleteResponse.message).toContain('Account deleted');
  });

  test('@regression @api Delete non-existent account should return 404', async ({ apiService }) => {
    const deletePayload = buildDeletePayload('nonexistent@example.com');
    const response = await apiService.delete('/deleteAccount', deletePayload);

    apiService.expectStatus(response, 200);
    expect(response.responseCode).toBe(404);
  });

  test('@regression @api Update account should return 200', async ({ apiService }) => {
    let created = false;

    try {
      // First create account
      const createPayload = buildAccountPayload(testEmail);
      const createResponse = await apiService.post('/createAccount', createPayload);
      created = createResponse.responseCode === 201;
      expect(createResponse.responseCode).toBe(201);

      // Then update it
      const updatePayload = buildUpdatePayload(testEmail, 'UpdatedFirstName', 'UpdatedLastName');
      const updateResponse = await apiService.put('/updateAccount', updatePayload);

      apiService.expectStatus(updateResponse, 200);
      apiService.expectResponseCode(updateResponse, 200);
      expect(updateResponse.message).toContain('User updated');
    } finally {
      if (created) {
        await apiService.delete('/deleteAccount', buildDeletePayload(testEmail));
      }
    }
  });
});
