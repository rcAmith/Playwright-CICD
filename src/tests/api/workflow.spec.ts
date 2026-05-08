import { test, expect } from '../../fixtures/apiFixtures';
import { generateTestEmail, buildAccountPayload, buildUpdatePayload, buildDeletePayload, buildLoginPayload } from '../../utils/apiHelpers';

test.describe('API: Account Lifecycle Workflow', () => {
  test('Complete workflow: create → verify → update → get details → delete', async ({ apiService }) => {
    const testEmail = generateTestEmail();
    const password = 'Password123';

    // Step 1: Create Account
    console.log('Step 1: Creating account...');
    const createPayload = buildAccountPayload(testEmail, password);
    const createResponse = await apiService.post('/createAccount', createPayload);
    apiService.expectResponseCode(createResponse, 201);
    expect(createResponse.message).toContain('User created');
    console.log(`✓ Account created for ${testEmail}`);

    // Step 2: Verify Login
    console.log('Step 2: Verifying login...');
    const loginPayload = buildLoginPayload(testEmail, password);
    const verifyResponse = await apiService.post('/verifyLogin', loginPayload);
    apiService.expectResponseCode(verifyResponse, 200);
    expect(verifyResponse.message).toContain('User exists');
    console.log('✓ Login verified');

    // Step 3: Update Account
    console.log('Step 3: Updating account...');
    const updatePayload = buildUpdatePayload(testEmail, 'WorkflowFirst', 'WorkflowLast');
    const updateResponse = await apiService.put('/updateAccount', updatePayload);
    apiService.expectResponseCode(updateResponse, 200);
    expect(updateResponse.message).toContain('User updated');
    console.log('✓ Account updated');

    // Step 4: Get User Details
    console.log('Step 4: Retrieving user details...');
    const detailsResponse = await apiService.get('/getUserDetailByEmail', { email: testEmail });
    apiService.expectResponseCode(detailsResponse, 200);
    expect(detailsResponse.user).toBeDefined();
    expect(detailsResponse.user.email).toBe(testEmail);
    expect(detailsResponse.user.first_name).toBe('WorkflowFirst');
    expect(detailsResponse.user.last_name).toBe('WorkflowLast');
    console.log('✓ User details retrieved and verified');

    // Step 5: Delete Account
    console.log('Step 5: Deleting account...');
    const deletePayload = buildDeletePayload(testEmail, password);
    const deleteResponse = await apiService.delete('/deleteAccount', deletePayload);
    apiService.expectResponseCode(deleteResponse, 200);
    expect(deleteResponse.message).toContain('Account deleted');
    console.log('✓ Account deleted');

    console.log('✓ Complete lifecycle workflow validated successfully');
  });

  test('Account persistence: verify same credential set in multiple calls', async ({ apiService }) => {
    const testEmail = generateTestEmail();
    const password = 'Password123';

    // Create account
    const createPayload = buildAccountPayload(testEmail, password);
    const createResponse = await apiService.post('/createAccount', createPayload);
    expect(createResponse.responseCode).toBe(201);

    // Verify login multiple times with same credentials
    const loginPayload = buildLoginPayload(testEmail, password);
    const verify1 = await apiService.post('/verifyLogin', loginPayload);
    const verify2 = await apiService.post('/verifyLogin', loginPayload);
    const verify3 = await apiService.post('/verifyLogin', loginPayload);

    expect(verify1.responseCode).toBe(200);
    expect(verify2.responseCode).toBe(200);
    expect(verify3.responseCode).toBe(200);

    // Cleanup
    const deletePayload = buildDeletePayload(testEmail, password);
    await apiService.delete('/deleteAccount', deletePayload);
  });
});
