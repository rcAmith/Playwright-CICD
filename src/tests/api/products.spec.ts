import { test, expect } from '../../fixtures/apiFixtures';

test.describe('API: Products List', () => {
  test('GET all products list should return 200', async ({ apiService }) => {
    const response = await apiService.get('/productsList');

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 200);
    expect(response.products).toBeDefined();
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products.length).toBeGreaterThan(0);
  });

  test('GET all products should contain expected product fields', async ({ apiService }) => {
    const response = await apiService.get('/productsList');

    expect(response.products[0]).toHaveProperty('id');
    expect(response.products[0]).toHaveProperty('name');
    expect(response.products[0]).toHaveProperty('price');
    expect(response.products[0]).toHaveProperty('brand');
    expect(response.products[0]).toHaveProperty('category');
  });

    test('POST products list should return 405 Method Not Allowed', async ({ apiService }) => {
    const response = await apiService.post('/productsList', {});

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 405);
    expect(response.message).toContain('not supported');
  });
});
