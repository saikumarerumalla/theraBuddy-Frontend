import { createWithEqualityFn } from 'zustand/traditional';

interface SettingsState {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;

  setTheme: (theme: 'light' | 'dark') => void;
  setNotifications: (enabled: boolean) => void;
  loadSettings: () => void;
}

export const useSettingsStore = createWithEqualityFn<SettingsState>((set) => ({
  theme: 'light',
  notificationsEnabled: true,

  setTheme: (theme) => {
    localStorage.setItem('therabuddy_theme', theme);
    set({ theme });
  },

  setNotifications: (enabled) => {
    set({ notificationsEnabled: enabled });
  },

  loadSettings: () => {
    const theme = (localStorage.getItem('therabuddy_theme') as 'light' | 'dark') || 'light';
    set({ theme });
  },
}));
