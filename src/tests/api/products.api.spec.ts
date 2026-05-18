import { test, expect } from '../../fixtures/apiFixtures';

test.describe('API: Products List', () => {
  test('@smoke @api GET all products list should return 200', async ({ apiService }) => {
    const response = await apiService.get('/productsList');

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 200);
    expect(response.products).toBeDefined();
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products.length).toBeGreaterThan(0);
  });

  test('@regression @api GET all products should contain expected product fields', async ({ apiService }) => {
    const response = await apiService.get('/productsList');

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 200);
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products.length).toBeGreaterThan(0);
    expect(response.products[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
      category: expect.any(Object)
    }));
  });

  test('@regression @api POST products list should return 405 Method Not Allowed', async ({ apiService }) => {
    const response = await apiService.post('/productsList', {});

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 405);
    expect(response.message).toContain('not supported');
  });
});
