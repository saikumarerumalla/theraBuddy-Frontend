import { createWithEqualityFn } from 'zustand/traditional';
import { Message, Conversation } from '../types/chat.types';
import { chatApi } from '@/api/chat';

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;

  createConversation: (sessionType?: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  loadMessages: (conversationId: string) => Promise<void>;
  endConversation: () => Promise<void>;
  clearMessages: () => void;
}

export const useChatStore = createWithEqualityFn<ChatState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  isSending: false,
  error: null,

  createConversation: async (sessionType = 'free_talk') => {
    set({ isLoading: true, error: null });
    try {
      const conversation = await chatApi.createConversation(sessionType);
      set({
        currentConversation: conversation,
        messages: [],
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  sendMessage: async (content: string) => {
    const { currentConversation, messages } = get();
    if (!currentConversation) return;

    // Add user message optimistically
    const userMessage: Message = {
      id: Date.now().toString(),
      conversationId: currentConversation.id,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    set({ messages: [...messages, userMessage], isSending: true });

    try {
      const response = await chatApi.sendMessage(
        content,
        currentConversation.id
      );

      const aiMessage: Message = {
        id: response.messageId,
        conversationId: currentConversation.id,
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString(),
        crisisDetected: response.crisisDetected,
      };

      set({
        messages: [...get().messages, aiMessage],
        isSending: false,
      });

    } catch (error: any) {
      set({ error: error.message, isSending: false });
    }
  },

  loadMessages: async (conversationId: string) => {
    set({ isLoading: true });
    try {
      const messages = await chatApi.getConversationHistory(conversationId);
      set({ messages, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  endConversation: async () => {
    const { currentConversation } = get();
    if (!currentConversation) return;

    try {
      await chatApi.endConversation(currentConversation.id);
      set({ currentConversation: null, messages: [] });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearMessages: () => set({ messages: [], currentConversation: null }),
}));
