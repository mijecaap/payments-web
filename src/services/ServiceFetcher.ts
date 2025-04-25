import { useAuthStore } from '@/stores/auth';

interface FetcherOptions extends RequestInit {
  requiresAuth?: boolean;
}

export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export class ServiceFetcher {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL;

  private static async fetch<T>(endpoint: string, options: FetcherOptions = {}): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options;

    const headers = new Headers(fetchOptions.headers);

    if (requiresAuth) {
      const token = useAuthStore.getState().token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Error en la petición') as Error & {
        response?: { status: number; data: ApiError };
      };
      error.response = {
        status: response.status,
        data,
      };
      throw error;
    }

    return data;
  }

  static get<T>(endpoint: string, options: FetcherOptions = {}) {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' });
  }

  static post<T, D = unknown>(endpoint: string, data?: D, options: FetcherOptions = {}) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static put<T, D = unknown>(endpoint: string, data?: D, options: FetcherOptions = {}) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static delete<T>(endpoint: string, options: FetcherOptions = {}) {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  }
}
