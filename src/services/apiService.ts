import { APIRequestContext, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL || 'https://automationexercise.com/api';

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

  /**
   * Perform a GET request
   */
  async get(endpoint: string, params?: Record<string, string>, options?: ApiRequestOptions): Promise<ApiResponse> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await this.request.get(url.toString(), {
      timeout: options?.timeout || 30000,
      headers: options?.headers || {}
    });

    const data = await response.json().catch(() => ({}));
    return {
      status: response.status(),
      ...data
    };
  }

  /**
   * Perform a POST request with form-urlencoded body
   */
  async post(
    endpoint: string,
    payload?: Record<string, string | number | boolean>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Convert payload to form-urlencoded format
    const body = new URLSearchParams();
    if (payload) {
      Object.entries(payload).forEach(([key, value]) => {
        body.append(key, String(value));
      });
    }

    const response = await this.request.post(url, {
      data: body.toString(),
      timeout: options?.timeout || 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options?.headers
      }
    });

    const data = await response.json().catch(() => ({}));
    return {
      status: response.status(),
      ...data
    };
  }

  /**
   * Perform a PUT request with form-urlencoded body
   */
  async put(
    endpoint: string,
    payload?: Record<string, string | number | boolean>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const body = new URLSearchParams();
    if (payload) {
      Object.entries(payload).forEach(([key, value]) => {
        body.append(key, String(value));
      });
    }

    const response = await this.request.put(url, {
      data: body.toString(),
      timeout: options?.timeout || 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options?.headers
      }
    });

    const data = await response.json().catch(() => ({}));
    return {
      status: response.status(),
      ...data
    };
  }

  /**
   * Perform a DELETE request with form-urlencoded body
   */
  async delete(
    endpoint: string,
    payload?: Record<string, string | number | boolean>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const body = new URLSearchParams();
    if (payload) {
      Object.entries(payload).forEach(([key, value]) => {
        body.append(key, String(value));
      });
    }

    const response = await this.request.delete(url, {
      data: body.toString(),
      timeout: options?.timeout || 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options?.headers
      }
    });

    const data = await response.json().catch(() => ({}));
    return {
      status: response.status(),
      ...data
    };
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
