import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Message } from '@/types/chat.types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { borderRadius } from '../../constants/spacing';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.aiText]}>
          {message.content}
        </Text>

        <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.aiTimestamp]}>
          {format(new Date(message.timestamp), 'HH:mm', { locale: ja })}
        </Text>
      </View>

      {message.crisisDetected && (
        <View style={styles.crisisIndicator}>
          <Text style={styles.crisisText}>⚠️ Emergency support is available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  userBubble: {
    backgroundColor: colors.primary.main,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.background.secondary,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  userText: {
    color: colors.text.inverse,
  },
  aiText: {
    color: colors.text.primary,
  },
  timestamp: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
  userTimestamp: {
    color: colors.text.inverse,
    opacity: 0.7,
    textAlign: 'right',
  },
  aiTimestamp: {
    color: colors.text.secondary,
  },
  crisisIndicator: {
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
  },
  crisisText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium as any,
  },
});
