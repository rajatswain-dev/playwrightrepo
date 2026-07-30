import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(
    private request: APIRequestContext,
    baseURL?: string
  ) {
    this.baseURL = baseURL || process.env.API_BASE_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(process.env.API_TOKEN && { Authorization: `Bearer ${process.env.API_TOKEN}` }),
    };
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<{ status: number; body: T }> {
    const response = await this.request.get(`${this.baseURL}${endpoint}`, {
      headers: this.defaultHeaders,
      params,
    });
    return { status: response.status(), body: await response.json() as T };
  }

  async post<T>(endpoint: string, data: object): Promise<{ status: number; body: T }> {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      headers: this.defaultHeaders,
      data,
    });
    return { status: response.status(), body: await response.json() as T };
  }

  async put<T>(endpoint: string, data: object): Promise<{ status: number; body: T }> {
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      headers: this.defaultHeaders,
      data,
    });
    return { status: response.status(), body: await response.json() as T };
  }

  async patch<T>(endpoint: string, data: object): Promise<{ status: number; body: T }> {
    const response = await this.request.patch(`${this.baseURL}${endpoint}`, {
      headers: this.defaultHeaders,
      data,
    });
    return { status: response.status(), body: await response.json() as T };
  }

  async delete(endpoint: string): Promise<{ status: number }> {
    const response: APIResponse = await this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: this.defaultHeaders,
    });
    return { status: response.status() };
  }

  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }
}
