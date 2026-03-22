export const STORAGE_KEYS = {
  AUTH_TOKEN: 'therabuddy_auth_token',
  REFRESH_TOKEN: 'therabuddy_refresh_token',
  LANGUAGE: 'therabuddy_language',
  THEME: 'therabuddy_theme',
  ONBOARDING_COMPLETED: 'therabuddy_onboarding_completed',
} as const;

export const secureStorage = {
  get: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  set: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
  },
  remove: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  },
};
