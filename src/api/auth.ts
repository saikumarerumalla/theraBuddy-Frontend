import { apiClient } from './client';
import { User, OnboardingData } from '../types/user.types';
import { secureStorage, STORAGE_KEYS } from '@/utils/storage';

export const authApi = {
  register: async (
    email: string,
    password: string,
    onboardingData: OnboardingData
  ) => {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
      onboarding: onboardingData,
    });

    const { accessToken, refreshToken } = response.data;
    await secureStorage.set(STORAGE_KEYS.AUTH_TOKEN, accessToken);
    await secureStorage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;
    await secureStorage.set(STORAGE_KEYS.AUTH_TOKEN, accessToken);
    await secureStorage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

    return response.data;
  },

  logout: async () => {
    await secureStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
    await secureStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },
};
