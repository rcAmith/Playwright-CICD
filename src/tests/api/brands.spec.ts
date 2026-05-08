import { test, expect } from '../../fixtures/apiFixtures';

test.describe('API: Brands List', () => {
  test('GET all brands list should return 200', async ({ apiService }) => {
    const response = await apiService.get('/brandsList');

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 200);
    expect(response.brands).toBeDefined();
    expect(Array.isArray(response.brands)).toBe(true);
    expect(response.brands.length).toBeGreaterThan(0);
  });

  test('GET all brands should contain expected brand fields', async ({ apiService }) => {
    const response = await apiService.get('/brandsList');

    expect(response.brands[0]).toHaveProperty('id');
    expect(response.brands[0]).toHaveProperty('brand');
  });

    test('PUT brands list should return 405 Method Not Allowed', async ({ apiService }) => {
    const response = await apiService.put('/brandsList', {});

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 405);
    expect(response.message).toContain('not supported');
  });
});
