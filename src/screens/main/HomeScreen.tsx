import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useMoodStore } from '@/store/moodStore';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

import { borderRadius } from '../../constants/spacing';

export const HomeScreen: React.FC = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { analytics, loadAnalytics } = useMoodStore();

  useEffect(() => {
    loadAnalytics(7);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.date}>
              {format(new Date(), 'EEEE, MMMM d')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
          >
            <Ionicons name="person-circle-outline" size={32} color={colors.primary.main} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Activities</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Chat')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.primary.light }]}>
                <Ionicons name="chatbubble-outline" size={24} color={colors.primary.main} />
              </View>
              <Text style={styles.actionTitle}>Chat</Text>
              <Text style={styles.actionSubtitle}>Talk with AI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Mood')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.secondary.light }]}>
                <Ionicons name="happy-outline" size={24} color={colors.secondary.main} />
              </View>
              <Text style={styles.actionTitle}>Mood Log</Text>
              <Text style={styles.actionSubtitle}>Record your mood</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Exercises')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.accent.light }]}>
                <Ionicons name="fitness-outline" size={24} color={colors.accent.main} />
              </View>
              <Text style={styles.actionTitle}>Exercises</Text>
              <Text style={styles.actionSubtitle}>Relax</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => {}}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.info + '20' }]}>
                <Ionicons name="book-outline" size={24} color={colors.info} />
              </View>
              <Text style={styles.actionTitle}>Resources</Text>
              <Text style={styles.actionSubtitle}>Helpful info</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mood Summary */}
        {analytics && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week's Mood</Text>
            <View style={styles.moodCard}>
              <View style={styles.moodStat}>
                <Text style={styles.moodValue}>{analytics.averageMood?.toFixed(1) || '0'}</Text>
                <Text style={styles.moodLabel}>Avg Mood</Text>
              </View>
              <View style={styles.moodStat}>
                <Ionicons
                  name="trending-up"
                  size={32}
                  color={colors.success}
                />
                <Text style={styles.moodLabel}>Stable</Text>
              </View>
            </View>
          </View>
        )}

        {/* Inspirational Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quote}>
            "One step at a time, at your own pace. You are not alone."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: typography.fontSize['2xl'] || typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.primary,
  },
  date: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  profileButton: {
    padding: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    width: '47%',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  moodCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodStat: {
    alignItems: 'center',
  },
  moodValue: {
    fontSize: typography.fontSize['3xl'] || typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold as any,
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  moodLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  quoteCard: {
    backgroundColor: colors.primary.light,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },
  quote: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontStyle: 'italic',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
});
