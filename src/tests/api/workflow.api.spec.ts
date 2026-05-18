import { test, expect } from '../../fixtures/apiFixtures';
import { generateTestEmail, buildAccountPayload, buildUpdatePayload, buildDeletePayload, buildLoginPayload } from '../../utils/apiHelpers';

test.describe('API: Account Lifecycle Workflow', () => {
  test('@regression @api Complete workflow: create → verify → update → get details → delete', async ({ apiService }) => {
    const testEmail = generateTestEmail();
    const password = 'Password123';
    let created = false;
    let deleted = false;

    try {
      await test.step('Create account', async () => {
        const createPayload = buildAccountPayload(testEmail, password);
        const createResponse = await apiService.post('/createAccount', createPayload);
        created = createResponse.responseCode === 201;
        apiService.expectResponseCode(createResponse, 201);
        expect(createResponse.message).toContain('User created');
      });

      await test.step('Verify login', async () => {
        const loginPayload = buildLoginPayload(testEmail, password);
        const verifyResponse = await apiService.post('/verifyLogin', loginPayload);
        apiService.expectResponseCode(verifyResponse, 200);
        expect(verifyResponse.message).toContain('User exists');
      });

      await test.step('Update account', async () => {
        const updatePayload = buildUpdatePayload(testEmail, 'WorkflowFirst', 'WorkflowLast');
        const updateResponse = await apiService.put('/updateAccount', updatePayload);
        apiService.expectResponseCode(updateResponse, 200);
        expect(updateResponse.message).toContain('User updated');
      });

      await test.step('Get updated user details', async () => {
        const detailsResponse = await apiService.get('/getUserDetailByEmail', { email: testEmail });
        apiService.expectResponseCode(detailsResponse, 200);
        expect(detailsResponse.user).toBeDefined();
        expect(detailsResponse.user.email).toBe(testEmail);
        expect(detailsResponse.user.first_name).toBe('WorkflowFirst');
        expect(detailsResponse.user.last_name).toBe('WorkflowLast');
      });

      await test.step('Delete account', async () => {
        const deletePayload = buildDeletePayload(testEmail, password);
        const deleteResponse = await apiService.delete('/deleteAccount', deletePayload);
        deleted = deleteResponse.responseCode === 200;
        apiService.expectResponseCode(deleteResponse, 200);
        expect(deleteResponse.message).toContain('Account deleted');
      });
    } finally {
      if (created && !deleted) {
        await apiService.delete('/deleteAccount', buildDeletePayload(testEmail, password));
      }
    }
  });

  test('@regression @api Account persistence: verify same credential set in multiple calls', async ({ apiService }) => {
    const testEmail = generateTestEmail();
    const password = 'Password123';
    let created = false;

    try {
      await test.step('Create account', async () => {
        const createPayload = buildAccountPayload(testEmail, password);
        const createResponse = await apiService.post('/createAccount', createPayload);
        created = createResponse.responseCode === 201;
        expect(createResponse.responseCode).toBe(201);
      });

      await test.step('Verify login repeatedly', async () => {
        const loginPayload = buildLoginPayload(testEmail, password);
        const verify1 = await apiService.post('/verifyLogin', loginPayload);
        const verify2 = await apiService.post('/verifyLogin', loginPayload);
        const verify3 = await apiService.post('/verifyLogin', loginPayload);

        expect(verify1.responseCode).toBe(200);
        expect(verify2.responseCode).toBe(200);
        expect(verify3.responseCode).toBe(200);
      });

      await test.step('Delete account', async () => {
        const deletePayload = buildDeletePayload(testEmail, password);
        await apiService.delete('/deleteAccount', deletePayload);
        created = false;
      });
    } finally {
      if (created) {
        await apiService.delete('/deleteAccount', buildDeletePayload(testEmail, password));
      }
    }
  });
});
