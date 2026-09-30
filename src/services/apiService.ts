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

  private async send(
    method: HttpMethod,
    endpoint: string,
    payload?: Record<string, any>,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);

    let data: string | undefined;

    if (method === "get" && payload) {
      Object.entries(payload).forEach(([k, v]) =>
        url.searchParams.append(k, String(v)),
      );
    } else if (payload) {
      const body = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => body.append(k, String(v)));
      data = body.toString();
    }

    const response = await this.request[method](url.toString(), {
      data,
      timeout: options?.timeout ?? 30000,
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

  get(
    endpoint: string,
    params?: Record<string, string>,
    options?: ApiRequestOptions,
  ) {
    return this.send("get", endpoint, params, options);
  }

  post(
    endpoint: string,
    payload?: Record<string, any>,
    options?: ApiRequestOptions,
  ) {
    return this.send("post", endpoint, payload, options);
  }

  put(
    endpoint: string,
    payload?: Record<string, any>,
    options?: ApiRequestOptions,
  ) {
    return this.send("put", endpoint, payload, options);
  }

  delete(
    endpoint: string,
    payload?: Record<string, any>,
    options?: ApiRequestOptions,
  ) {
    return this.send("delete", endpoint, payload, options);
  }

  expectStatus(response: ApiResponse, code: number) {
    expect(response.status).toBe(code);
  }

  expectResponseCode(response: ApiResponse, code: number) {
    expect(response.responseCode).toBe(code);
  }

  expectMessage(response: ApiResponse, msg: string) {
    expect(response.message).toContain(msg);
  }
}
