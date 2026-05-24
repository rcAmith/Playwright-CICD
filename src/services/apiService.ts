import { APIRequestContext, expect } from "@playwright/test";

const API_BASE_URL =
  process.env.API_BASE_URL || "https://automationexercise.com/api";

type HttpMethod = "get" | "post" | "put" | "delete";

export interface ApiResponse {
  status: number;
  responseCode?: number;
  message?: string;
  [key: string]: any;
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

export class ApiService {
  constructor(private request: APIRequestContext) {}

  private async sendRequest(
    method: HttpMethod,
    endpoint: string,
    payload?: Record<string, string | number | boolean>,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);

    let data;

    // GET uses query params
    if (method === "get" && payload) {
      Object.entries(payload).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // Others use request body
    else if (payload) {
      const body = new URLSearchParams();

      Object.entries(payload).forEach(([key, value]) => {
        body.append(key, String(value));
      });

      data = body.toString();
    }

    const response = await this.request[method](url.toString(), {
      data,
      timeout: options?.timeout || 30000,

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",

        ...options?.headers,
      },
    });

    const responseData = await response.json().catch(() => ({}));

    return {
      status: response.status(),
      ...responseData,
    };
  }

  async get(
    endpoint: string,
    params?: Record<string, string>,
    options?: ApiRequestOptions,
  ) {
    return this.sendRequest("get", endpoint, params, options);
  }

  async post(
    endpoint: string,
    payload?: Record<string, string | number | boolean>,
    options?: ApiRequestOptions,
  ) {
    return this.sendRequest("post", endpoint, payload, options);
  }

  async put(
    endpoint: string,
    payload?: Record<string, string | number | boolean>,
    options?: ApiRequestOptions,
  ) {
    return this.sendRequest("put", endpoint, payload, options);
  }

  async delete(
    endpoint: string,
    payload?: Record<string, string | number | boolean>,
    options?: ApiRequestOptions,
  ) {
    return this.sendRequest("delete", endpoint, payload, options);
  }

  /**
   * Assert response status code
   */
  expectStatus(response: ApiResponse, expectedStatus: number): void {
    expect(response.status).toBe(expectedStatus);
  }

  /**
   * Assert response code in body
   */
  expectResponseCode(response: ApiResponse, expectedCode: number): void {
    expect(response.responseCode).toBe(expectedCode);
  }

  /**
   * Assert message contains text
   */
  expectMessage(response: ApiResponse, expectedMessage: string): void {
    expect(response.message).toContain(expectedMessage);
  }
}
