import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '@constants/config';
import { secureStorage, STORAGE_KEYS } from '@utils/storage';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = await secureStorage.get(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          await this.refreshToken();
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken() {
    try {
      const refreshToken = await secureStorage.get(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) throw new Error('No refresh token');

      const response = await this.client.post('/auth/refresh', {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      await secureStorage.set(STORAGE_KEYS.AUTH_TOKEN, accessToken);
      await secureStorage.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
    } catch (error) {
      // Refresh failed, logout user
      await secureStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
      await secureStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      // Navigate to login screen
    }
  }

  getInstance() {
    return this.client;
  }
}

export const apiClient = new ApiClient().getInstance();
