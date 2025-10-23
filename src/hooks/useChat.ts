import { useState, useEffect, useCallback } from 'react';
import { useChatStore } from '@/store/chatStore';
import { Message } from '@/types/chat.types';

export const useChat = (conversationId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    conversations,
    currentConversation,
    messages,
    createConversation,
    sendMessage: sendMessageViaStore,
    loadMessages,
    endConversation,
    clearMessages,
  } = useChatStore();

  useEffect(() => {
    if (conversationId) {
      loadConversationMessages(conversationId);
    }
  }, [conversationId]);

  const loadConversationMessages = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await loadMessages(id);
    } catch (err: any) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    setIsTyping(true);
    setError(null);
    try {
      await sendMessageViaStore(content.trim());
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsTyping(false);
    }
  };

  const createNewConversation = useCallback(async () => {
    try {
      await createConversation();
      return currentConversation;
    } catch (err: any) {
      setError(err.message || 'Failed to create conversation');
      return null;
    }
  }, [currentConversation]);

  const deleteConversation = async (_id: string) => {
    try {
      await endConversation();
    } catch (err: any) {
      setError(err.message || 'Failed to delete conversation');
    }
  };

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    isTyping,
    error,
    sendMessage,
    createNewConversation,
    deleteConversation,
    clearMessages,
  };
};
