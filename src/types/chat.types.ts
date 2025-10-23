export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tokensUsed?: number;
  sentimentScore?: number;
  crisisDetected?: boolean;
}

export interface Conversation {
  id: string;
  sessionType: 'free_talk' | 'guided_session' | 'quick_checkin' | 'crisis';
  startedAt: string;
  endedAt?: string;
  messageCount: number;
  crisisDetected?: boolean;
}

export interface ChatResponse {
  messageId: string;
  response: string;
  crisisDetected: boolean;
  crisisResources?: CrisisResources;
  tokensUsed?: number;
}

export interface CrisisResources {
  hotlines: Array<{
    name: string;
    phone: string;
    hours: string;
    language?: string;
  }>;
  emergency: Array<{
    name: string;
    phone: string;
  }>;
  message: string;
}
