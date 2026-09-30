import { test, expect } from '../../fixtures/apiFixtures';
import { generateTestEmail, buildAccountPayload, buildUpdatePayload, buildDeletePayload, buildLoginPayload } from '../../utils/apiHelpers';

test.describe('API: Account Lifecycle Workflow', () => {
  test('@regression @api Complete workflow: create → verify → update → get details → delete', async ({ apiService ,accountService,authService}) => {
    const testEmail = generateTestEmail();
    const password = 'Password123';
    let created = false;
    let deleted = false;

    try {
      await test.step('Create account', async () => {
        const createResponse = await accountService.createUser(testEmail);
        created = createResponse.responseCode === 201;
        apiService.expectResponseCode(createResponse, 201);
        expect(createResponse.message).toContain('User created');
      });

      await test.step('Verify login', async () => {
        const verifyResponse = await authService.login({ email: testEmail, password });
        apiService.expectResponseCode(verifyResponse, 200);
        expect(verifyResponse.message).toContain('User exists');
      });

      await test.step('Update account', async () => {
        const updateResponse = await accountService.updateUser(testEmail, 'WorkflowFirst', 'WorkflowLast');
        apiService.expectResponseCode(updateResponse, 200);
        expect(updateResponse.message).toContain('User updated');
      });

      await test.step('Get updated user details', async () => {
        const detailsResponse = await accountService.getUserByEmail(testEmail);
        apiService.expectResponseCode(detailsResponse, 200);
        expect(detailsResponse.user).toBeDefined();
        expect(detailsResponse.user.email).toBe(testEmail);
        expect(detailsResponse.user.first_name).toBe('WorkflowFirst');
        expect(detailsResponse.user.last_name).toBe('WorkflowLast');
      });

      await test.step('Delete account', async () => {
        const deleteResponse = await accountService.deleteUser(testEmail);
        deleted = deleteResponse.responseCode === 200;
        apiService.expectResponseCode(deleteResponse, 200);
        expect(deleteResponse.message).toContain('Account deleted');
      });
    } finally {
      if (created && !deleted) {
        await accountService.deleteUser(testEmail);
      }
    }
  });

  test('@regression @api Account persistence: verify same credential set in multiple calls', async ({ apiService,accountService, authService }) => {
    const testEmail = generateTestEmail();
    const password = 'Password123';
    let created = false;
    let deleted = false;

    try {
      await test.step('Create account', async () => {
        const createResponse = await accountService.createUser(testEmail);
        created = createResponse.responseCode === 201;
        apiService.expectResponseCode(createResponse, 201);
        expect(createResponse.message).toContain('User created');
      });

      await test.step('Verify login repeatedly', async () => {
        const verify1 = await authService.login({ email: testEmail, password });
        const verify2 = await authService.login({ email: testEmail, password });
        const verify3 = await authService.login({ email: testEmail, password });

        apiService.expectResponseCode(verify1, 200);
        apiService.expectResponseCode(verify2, 200);
        apiService.expectResponseCode(verify3, 200);
      });

      await test.step('Delete account', async () => {
        const deleteResponse = await accountService.deleteUser(testEmail);
        deleted = deleteResponse.responseCode === 200;
        apiService.expectResponseCode(deleteResponse, 200);
        expect(deleteResponse.message).toContain('Account deleted');
      });
    } finally {
      if (created && !deleted) {
        await accountService.deleteUser(testEmail);
      }
    }
  });
});
