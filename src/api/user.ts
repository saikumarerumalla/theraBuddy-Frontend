import { apiClient } from './client';
import { User, UserProfile } from '../types/user.types';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  updateProfile: async (profileData: Partial<UserProfile>): Promise<User> => {
    const response = await apiClient.patch('/users/me', profileData);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await apiClient.delete('/users/me');
    return response.data;
  },

  updateLanguage: async (language: 'ja' | 'en' | 'both') => {
    const response = await apiClient.patch('/users/me/language', { language });
    return response.data;
  },

  updateNotificationPreferences: async (preferences: any) => {
    const response = await apiClient.patch('/users/me/notifications', preferences);
    return response.data;
  },
};
