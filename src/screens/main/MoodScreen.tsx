import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodSlider } from '@/components/mood/MoodSlider';
import { MoodChart } from '@/components/mood/MoodChart';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { colors, spacing, typography } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useMoodStore } from '@/store/moodStore';
import { borderRadius } from '../../constants/spacing';

export const MoodScreen: React.FC = () => {
  const { t } = useTranslation();
  const { createMoodEntry, moodHistory, loadMoodHistory, analytics, loadAnalytics } = useMoodStore();

  const [overallMood, setOverallMood] = useState(5);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMoodHistory(30);
    loadAnalytics(30);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createMoodEntry({
        overallMood,
        anxietyLevel,
        energyLevel,
        sleepQuality,
        stressLevel,
        notes: notes.trim() || undefined,
        date: new Date().toISOString(),
      });

      Alert.alert('Entry Saved', 'Your mood has been recorded');

      // Reset form
      setOverallMood(5);
      setAnxietyLevel(5);
      setEnergyLevel(5);
      setSleepQuality(5);
      setStressLevel(5);
      setNotes('');

      // Reload data
      loadMoodHistory(30);
      loadAnalytics(30);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Today's Check-in */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('mood.checkIn')}</Text>

          <View style={styles.card}>
            <MoodSlider
              label={t('mood.overallMood')}
              value={overallMood}
              onValueChange={setOverallMood}
            />

            <MoodSlider
              label={t('mood.anxiety')}
              value={anxietyLevel}
              onValueChange={setAnxietyLevel}
              minLabel="Calm"
              maxLabel="Very Anxious"
            />

            <MoodSlider
              label={t('mood.energy')}
              value={energyLevel}
              onValueChange={setEnergyLevel}
              minLabel="Tired"
              maxLabel="Energetic"
            />

            <MoodSlider
              label={t('mood.sleep')}
              value={sleepQuality}
              onValueChange={setSleepQuality}
              minLabel="Very Poor"
              maxLabel="Very Good"
            />

            <MoodSlider
              label={t('mood.stress')}
              value={stressLevel}
              onValueChange={setStressLevel}
              minLabel="Relaxed"
              maxLabel="Very High"
            />

            <Input
              label={t('mood.notes')}
              placeholder="How are you feeling today..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />

            <Button
              title={t('mood.submit')}
              onPress={handleSubmit}
              loading={loading}
              variant="primary"
              size="large"
              fullWidth
            />
          </View>
        </View>

        {/* Mood Chart */}
        {moodHistory && moodHistory.length > 0 && (
          <View style={styles.section}>
            <MoodChart data={moodHistory} />
          </View>
        )}
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
});
