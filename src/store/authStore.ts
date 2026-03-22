import { createWithEqualityFn } from 'zustand/traditional';
import { User, UserProfile } from '../types/user.types';
import { authApi } from '@/api/auth';
import { userApi } from '@/api/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile> & { onboardingCompleted?: boolean }) => Promise<void>;
}

export const useAuthStore = createWithEqualityFn<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.login(email, password);
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  register: async (email, password, _name) => {
    // Minimal onboarding defaults to satisfy API requirements
    set({ isLoading: true, error: null });
    try {
      await authApi.register(email, password, {
        languagePreference: 'en',
        conversationStyle: 'balanced',
        aiCompanionStyle: 'supportive',
        checkinFrequency: 'daily',
        dataConsent: true,
        termsAccepted: true,
      } as any);
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await authApi.logout();
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    set({ isLoading: true });
    try {
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateUserProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userApi.updateProfile(profileData);
      set({ user: updatedUser, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
