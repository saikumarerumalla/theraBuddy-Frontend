import { apiClient } from './client';
import { ChatResponse, Message, Conversation } from '../types/chat.types';

export const chatApi = {
  sendMessage: async (
    content: string,
    conversationId?: string,
    sessionType: string = 'free_talk'
  ): Promise<ChatResponse> => {
    const response = await apiClient.post('/chat/message', {
      content,
      conversationId,
      sessionType,
    });
    return response.data;
  },

  createConversation: async (sessionType: string = 'free_talk'): Promise<Conversation> => {
    const response = await apiClient.post('/chat/conversation', {
      sessionType,
    });
    return response.data;
  },

  endConversation: async (conversationId: string) => {
    const response = await apiClient.post(`/chat/conversation/${conversationId}/end`);
    return response.data;
  },

  getConversationHistory: async (conversationId: string): Promise<Message[]> => {
    const response = await apiClient.get(`/chat/conversation/${conversationId}/history`);
    return response.data;
  },
};
