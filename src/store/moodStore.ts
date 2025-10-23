import { createWithEqualityFn } from 'zustand/traditional';
import { MoodEntry, MoodAnalytics } from '../types/mood.types';
import { moodApi } from '@api/mood';

interface MoodState {
  moodHistory: MoodEntry[];
  analytics: MoodAnalytics | null;
  isLoading: boolean;
  error: string | null;

  createMoodEntry: (moodData: Partial<MoodEntry>) => Promise<void>;
  loadMoodHistory: (days?: number) => Promise<void>;
  loadAnalytics: (days?: number) => Promise<void>;
}

export const useMoodStore = createWithEqualityFn<MoodState>((set) => ({
  moodHistory: [],
  analytics: null,
  isLoading: false,
  error: null,

  createMoodEntry: async (moodData) => {
    set({ isLoading: true, error: null });
    try {
      const entry = await moodApi.createMoodEntry(moodData);
      set((state) => ({
        moodHistory: [entry, ...state.moodHistory],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  loadMoodHistory: async (days = 30) => {
    set({ isLoading: true });
    try {
      const history = await moodApi.getMoodHistory(days);
      set({ moodHistory: history, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  loadAnalytics: async (days = 30) => {
    set({ isLoading: true });
    try {
      const analytics = await moodApi.getMoodAnalytics(days);
      set({ analytics, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
