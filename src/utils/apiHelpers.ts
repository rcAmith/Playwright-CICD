/**
 * Generate a unique email address for testing
 */
export function generateTestEmail(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return `autotest_${timestamp}_${random}@example.com`;
}

/**
 * Build account creation payload with all required fields
 */
export function buildAccountPayload(
  email: string,
  password: string = "Password123",
): Record<string, string> {
  return {
    name: "AutoTest User",
    firstname: "AutoTest",
    lastname: "User",
    email,
    password,
    address1: "123 Test Street",
    country: "United States",
    state: "California",
    city: "San Francisco",
    zipcode: "94107",
    mobile_number: "5551234567",
  };
}

/**
 * Build account update payload
 */
export function buildUpdatePayload(
  email: string,
  firstname = "Updated",
  lastname = "User",
): Record<string, string> {
  return {
    firstname,
    lastname,
    email,
    password: "Password123",
    address1: "456 Updated Street",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",
    mobile_number: "5559876543",
  };
}

/**
 * Build login verification payload
 */
export function buildLoginPayload(
  email?: string,
  password?: string,
): Record<string, string> {
  const payload: Record<string, string> = {};

  if (email !== undefined) {
    payload.email = email;
  }

  if (password !== undefined) {
    payload.password = password;
  }

  return payload;
}

/**
 * Build account deletion payload
 */
export function buildDeletePayload(
  email: string,
  password: string = "Password123",
): Record<string, string> {
  return {
    email,
    password,
  };
}

/**
 * Build search product payload
 */
export function buildSearchPayload(product: string): Record<string, string> {
  return {
    search_product: product,
  };
}

/**
 * Validate response has required fields
 */
export function validateResponseStructure(
  response: any,
  requiredFields: string[],
): boolean {
  return requiredFields.every((field) => field in response);
}

/**
 * Assert response indicates success
 */
export function isSuccessResponse(response: any): boolean {
  return response.responseCode === 200 || response.responseCode === 201;
}

/**
 * Assert response indicates error
 */
export function isErrorResponse(response: any): boolean {
  return response.responseCode >= 400;
}
