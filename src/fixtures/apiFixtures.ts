import { test as base } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";
import { ApiService } from "../services/apiService";
import { AccountService } from "../services/accountService";
import { AuthService } from "../services/authServices";

type ApiFixtures = {
  apiService: ApiService;
  accountService: AccountService;
  authService: AuthService;
};

export const test = base.extend<ApiFixtures>({
  apiService: async ({ request }, use) => {
    await use(new ApiService(request));
  },
  accountService: async ({ apiService }, use) => {
    await use(new AccountService(apiService));
  },
  authService: async ({ apiService }, use) => {
    await use(new AuthService(apiService));
  },
});

export { expect } from "@playwright/test";
