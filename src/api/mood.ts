import { apiClient } from './client';
import { MoodEntry, MoodAnalytics, Assessment } from '../types/mood.types';

export const moodApi = {
  createMoodEntry: async (moodData: Partial<MoodEntry>): Promise<MoodEntry> => {
    const response = await apiClient.post('/mood/entry', moodData);
    return response.data;
  },

  getMoodHistory: async (days: number = 30): Promise<MoodEntry[]> => {
    const response = await apiClient.get('/mood/history', {
      params: { days },
    });
    return response.data;
  },

  getMoodAnalytics: async (days: number = 30): Promise<MoodAnalytics> => {
    const response = await apiClient.get('/mood/analytics', {
      params: { days },
    });
    return response.data;
  },

  createAssessment: async (
    assessmentType: string,
    responses: Record<string, number>
  ): Promise<Assessment> => {
    const response = await apiClient.post('/mood/assessment', {
      assessmentType,
      responses,
    });
    return response.data;
  },

  getAssessmentHistory: async (assessmentType?: string): Promise<Assessment[]> => {
    const response = await apiClient.get('/mood/assessments', {
      params: { assessmentType },
    });
    return response.data;
  },
};
