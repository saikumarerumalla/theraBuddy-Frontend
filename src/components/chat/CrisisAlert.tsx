import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/constants';
import { useTranslation } from 'react-i18next';
import { borderRadius } from '../../constants/spacing';


interface CrisisAlertProps {
  onDismiss?: () => void;
}

const CRISIS_HOTLINES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    phone: '988',
    hours: '24/7',
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    hours: '24/7',
  },
  {
    name: 'Emergency',
    phone: '911',
    hours: '24/7',
  },
];

export const CrisisAlert: React.FC<CrisisAlertProps> = ({ onDismiss }) => {
  const { t } = useTranslation();

  const handleCall = (phone: string) => {
    const phoneUrl = `tel:${phone.replace(/[-/]/g, '')}`;
    Linking.openURL(phoneUrl).catch((err) =>
      console.error('Failed to make phone call:', err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle" size={24} color={colors.error} />
        </View>
        <Text style={styles.title}>{t('chat.crisisDetected')}</Text>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.message}>{t('chat.crisisMessage')}</Text>

      <View style={styles.hotlinesContainer}>
        {CRISIS_HOTLINES.map((hotline, index) => (
          <TouchableOpacity
            key={index}
            style={styles.hotlineItem}
            onPress={() => handleCall(hotline.phone)}
          >
            <View style={styles.hotlineInfo}>
              <Text style={styles.hotlineName}>{hotline.name}</Text>
              <Text style={styles.hotlinePhone}>{hotline.phone}</Text>
              <Text style={styles.hotlineHours}>{hotline.hours}</Text>
            </View>
            <Ionicons name="call" size={24} color={colors.primary.main} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your life matters. Don't struggle alone — please reach out for help.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.md,
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: 20,
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.inverse,
  },
  closeButton: {
    padding: spacing.xs,
  },
  message: {
    fontSize: typography.fontSize.base,
    color: colors.text.inverse,
    marginBottom: spacing.md,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  hotlinesContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  hotlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  hotlineInfo: {
    flex: 1,
  },
  hotlineName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  hotlinePhone: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  hotlineHours: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.inverse,
    textAlign: 'center',
    fontWeight: typography.fontWeight.medium as any,
  },
});
