import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/common/Button';
import { colors, spacing, typography } from '@/constants';
import { borderRadius } from '../../constants/spacing';

export const GAD7Screen: React.FC = ({ navigation }: any) => {
  const [responses, setResponses] = useState<number[]>([]);

  const questions = [
    '緊張感、不安感、または神経過敏を感じる',
    '心配するのを止められない、またはコントロールできない',
    'いろいろなことを心配しすぎる',
    'リラックスすることが難しい',
    'そわそわと落ち着かなくなる',
    'いらいらする、または怒りっぽくなる',
    '何か恐ろしいことが起こるような気がして怖くなる',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>GAD-7 不安評価スケール</Text>
        <Text style={styles.description}>
          過去2週間で、以下の問題にどのくらい悩まされましたか？
        </Text>

        <View style={styles.questionsContainer}>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionCard}>
              <Text style={styles.questionText}>
                {index + 1}. {question}
              </Text>
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>回答オプションがここに表示されます</Text>
              </View>
            </View>
          ))}
        </View>

        <Button
          title="提出"
          onPress={() => navigation.goBack()}
          variant="primary"
          size="large"
          fullWidth
        />
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
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  questionsContainer: {
    marginBottom: spacing.xl,
  },
  questionCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  questionText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  placeholder: {
    padding: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.sm,
  },
  placeholderText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.disabled,
    textAlign: 'center',
  },
});
