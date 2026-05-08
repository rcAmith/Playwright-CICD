import { test, expect } from '../../fixtures/apiFixtures';
import { buildSearchPayload } from '../../utils/apiHelpers';

test.describe('API: Search Product', () => {
  test('Search product with valid parameter should return 200', async ({ apiService }) => {
    const response = await apiService.post('/searchProduct', buildSearchPayload('top'));

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 200);
    expect(response.products).toBeDefined();
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products.length).toBeGreaterThan(0);
  });

    test('Search product results should contain matching products', async ({ apiService }) => {
    const searchTerm = 'top';
    const response = await apiService.post('/searchProduct', buildSearchPayload(searchTerm));

    const someProductsMatchName = response.products.some((product: any) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    const someProductsMatchCategory = response.products.some((product: any) =>
      product.category?.category?.toLowerCase().includes(searchTerm)
    );
    
    expect(someProductsMatchName || someProductsMatchCategory).toBe(true);
    expect(response.products.length).toBeGreaterThan(0);
  });

  test('Search product without parameter should return 400', async ({ apiService }) => {
    const response = await apiService.post('/searchProduct', {});

    apiService.expectStatus(response, 200);
    apiService.expectResponseCode(response, 400);
    expect(response.message).toContain('search_product parameter is missing');
  });

    test('Search product with empty string should return 200', async ({ apiService }) => {
      const response = await apiService.post('/searchProduct', buildSearchPayload(''));

      // The API returns 200/200 for empty search string, treating it as a valid request that returns all/no products
      apiService.expectStatus(response, 200);
      apiService.expectResponseCode(response, 200);
    });
});
