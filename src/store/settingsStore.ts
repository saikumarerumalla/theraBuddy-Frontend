import { createWithEqualityFn } from 'zustand/traditional';
import { mmkvStorage, STORAGE_KEYS } from '@utils/storage';

interface SettingsState {
  language: 'ja' | 'en';
  theme: 'light' | 'dark';
  biometricEnabled: boolean;
  notificationsEnabled: boolean;

  setLanguage: (language: 'ja' | 'en') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setBiometric: (enabled: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  loadSettings: () => void;
}

export const useSettingsStore = createWithEqualityFn<SettingsState>((set) => ({
  language: 'ja',
  theme: 'light',
  biometricEnabled: false,
  notificationsEnabled: true,

  setLanguage: (language) => {
    mmkvStorage.set(STORAGE_KEYS.LANGUAGE, language);
    set({ language });
  },

  setTheme: (theme) => {
    mmkvStorage.set(STORAGE_KEYS.THEME, theme);
    set({ theme });
  },

  setBiometric: (enabled) => {
    mmkvStorage.set(STORAGE_KEYS.BIOMETRIC_ENABLED, enabled);
    set({ biometricEnabled: enabled });
  },

  setNotifications: (enabled) => {
    set({ notificationsEnabled: enabled });
  },

  loadSettings: () => {
    const language = mmkvStorage.get(STORAGE_KEYS.LANGUAGE) || 'ja';
    const theme = mmkvStorage.get(STORAGE_KEYS.THEME) || 'light';
    const biometricEnabled = mmkvStorage.get(STORAGE_KEYS.BIOMETRIC_ENABLED) || false;

    set({ language, theme, biometricEnabled });
  },
}));
