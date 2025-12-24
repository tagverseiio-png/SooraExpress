// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const apiClient = {
  baseUrl: API_BASE_URL,
  
  async request<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      let errorMessage = response.statusText || 'Request failed';
      try {
        const errorBody = await response.json();
        if (errorBody?.error) {
          errorMessage = errorBody.error;
        } else if (errorBody?.message) {
          errorMessage = errorBody.message;
        }
      } catch (parseError) {
        const fallback = await response.text();
        if (fallback) {
          errorMessage = fallback;
        }
      }
      throw new Error(errorMessage);
    }
    
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  },
};
