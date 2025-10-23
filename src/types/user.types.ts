export interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  isPremium: boolean;
  languagePreference: 'ja' | 'en' | 'both';
  onboardingCompleted: boolean;
  createdAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  ageRange?: string;
  gender?: string;
  prefecture?: string;
  primaryConcerns?: string[];
  wellBeingScore?: number;
  therapyGoals?: string[];
  conversationStyle?: 'more_questions' | 'more_guidance' | 'balanced';
  aiCompanionStyle?: string;
  notificationPreferences?: NotificationPreferences;
}

export interface NotificationPreferences {
  dailyCheckIn: boolean;
  progressUpdates: boolean;
  motivationalMessages: boolean;
  minimal: boolean;
}

export interface OnboardingData {
  ageRange?: string;
  gender?: string;
  prefecture?: string;
  languagePreference: 'ja' | 'en';
  hasPreviousTherapy?: string;
  currentMedication?: string;
  primaryConcerns?: string[];
  wellBeingScore?: number;
  concernDuration?: string;
  lifeSituation?: string[];
  livingSituation?: string;
  supportSystem?: string[];
  therapyGoals?: string[];
  conversationStyle: string;
  aiCompanionStyle: string;
  checkinFrequency: string;
  dataConsent: boolean;
  termsAccepted: boolean;
}
