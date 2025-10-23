export interface MoodEntry {
  id: string;
  overallMood: number;
  anxietyLevel?: number;
  energyLevel?: number;
  sleepQuality?: number;
  stressLevel?: number;
  notes?: string;
  triggers?: string[];
  activities?: string[];
  date: string;
}

export interface MoodAnalytics {
  averageMood: number;
  moodTrend: 'improving' | 'declining' | 'stable' | 'insufficient_data';
  bestDay: {
    date: string;
    mood: number;
  };
  worstDay: {
    date: string;
    mood: number;
  };
  moodVariance: number;
  totalEntries: number;
}

export interface Assessment {
  id: string;
  assessmentType: 'PHQ-9' | 'GAD-7' | 'PCL-5';
  totalScore: number;
  severityLevel: string;
  completedAt: string;
  scoreChange?: number;
}
