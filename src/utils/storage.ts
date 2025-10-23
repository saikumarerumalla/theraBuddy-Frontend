import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';

// Fast key-value storage
const storage = new MMKV();

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  LANGUAGE: 'language',
  THEME: 'theme',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  BIOMETRIC_ENABLED: 'biometric_enabled',
};

// MMKV Storage (fast, non-sensitive data)
export const mmkvStorage = {
  set: (key: string, value: any) => {
    storage.set(key, JSON.stringify(value));
  },

  get: (key: string) => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  },

  remove: (key: string) => {
    storage.delete(key);
  },

  clear: () => {
    storage.clearAll();
  },
};

// Secure Storage (sensitive data like tokens)
export const secureStorage = {
  set: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },

  get: async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
  },

  remove: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};

// AsyncStorage (backup for large data)
export const asyncStorage = {
  set: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  get: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },

  clear: async () => {
    await AsyncStorage.clear();
  },
};
