import { test as base } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { ApiService } from '../services/apiService';

type ApiFixtures = {
  apiService: ApiService;
};

export const test = base.extend<ApiFixtures>({
  apiService: async ({ request }, use) => {
    const apiService = new ApiService(request);
    await use(apiService);
  }
});

export { expect } from '@playwright/test';
