import { test, expect } from "../../fixtures/apiFixtures";
import { validLoginUser } from "../../test-data/users";
import {
  generateTestEmail,
  buildAccountPayload,
  buildUpdatePayload,
  buildDeletePayload,
} from "../../utils/apiHelpers";

test.describe("API: Account Management", () => {
  let testEmail: string;

  test.beforeEach(async () => {
    testEmail = generateTestEmail();
  });

  test("@regression @api Create account should return 201", async ({
    apiService,
    accountService,
  }) => {
    let created = false;

    try {
      const response = await accountService.createUser(testEmail);
      created = response.responseCode === 201;

      apiService.expectStatus(response, 200);
      apiService.expectResponseCode(response, 201);
      expect(response.message).toContain("User created");
    } finally {
      if (created) {
        await accountService.deleteUser(testEmail);
      }
    }
  });

  test("@regression @api Create account with duplicate email should return 400", async ({
    apiService,
    accountService,
  }) => {
    const response = await accountService.createUser("test@example.com");

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain("Email already exists");
  });

  test("@regression @api Get user details by email should return 200", async ({
    apiService,
    accountService,
  }) => {
    const response = await accountService.getUserByEmail('test@example.com');

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 200);
    expect(response.user).toBeDefined();
    expect(response.user.email).toBe("test@example.com");
  });

  test("@regression @api Get user details with missing email should return 400", async ({
    apiService,
    accountService,
  }) => {
    const response = await apiService.get("/getUserDetailByEmail", {});


    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain("email parameter is missing");
  });

  test("@regression @api Delete account should return 200", async ({
    apiService,
    accountService,
  }) => {
    // First create account
    const createResponse = await accountService.createUser(testEmail);
    apiService.expectStatus(createResponse, 200);

    // Then delete it
    const deleteResponse = await accountService.deleteUser(testEmail);

    apiService.expectStatus(deleteResponse, 200);
    apiService.expectResponseCode(deleteResponse, 200);
    expect(deleteResponse.message).toContain("Account deleted");
  });

  test("@regression @api Delete non-existent account should return 404", async ({
    apiService,
    accountService,
  }) => {
    const response = await accountService.deleteUser("nonexistent@example.com");

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 404);
    expect(response.message).toContain("Account not found");
  });

  test("@regression @api Update account should return 200", async ({
    apiService,
    accountService,
  }) => {
    let created = false;

    try {
      // First create account
      const createPayload = buildAccountPayload(testEmail);
      const createResponse = await accountService.createUser(testEmail);
      created = createResponse.responseCode === 201;
      apiService.expectStatus(createResponse, 200);

      // Then update it
      const updateResponse = await accountService.updateUser(
        testEmail,
        "UpdatedFirstName",
        "UpdatedLastName",
      );

      apiService.expectStatus(updateResponse, 200);
      apiService.expectResponseCode(updateResponse, 200);
      expect(updateResponse.message).toContain("User updated");
    } finally {
      if (created) {
        await accountService.deleteUser(testEmail);
      }
    }
  });
});
