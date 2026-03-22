import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/constants';
import { Button } from '@/components/common/Button';
import { borderRadius } from '../../constants/spacing';
interface CrisisAssessmentProps {
  onComplete: (hasCrisisRisk: boolean) => void;
}

const CRISIS_QUESTIONS = [
  {
    id: 1,
    question: 'Have you recently thought about hurting yourself?',
  },
  {
    id: 2,
    question: 'Have you had thoughts of wanting to die?',
  },
  {
    id: 3,
    question: 'Have you made a specific plan for suicide?',
  },
];

const EMERGENCY_CONTACTS = [
  { name: '988 Suicide & Crisis Lifeline', phone: '988' },
  { name: 'Emergency', phone: '911' },
];

export const CrisisAssessment: React.FC<CrisisAssessmentProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [showWarning, setShowWarning] = useState(false);

  const handleAnswer = (questionId: number, answer: boolean) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Check if any answer is "yes"
    const hasCrisisRisk = Object.values(newAnswers).some((ans) => ans === true);
    if (hasCrisisRisk) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const handleContinue = () => {
    const allAnswered = CRISIS_QUESTIONS.every((q) => answers[q.id] !== undefined);

    if (!allAnswered) {
      Alert.alert('Confirm', 'Please answer all questions.');
      return;
    }

    const hasCrisisRisk = Object.values(answers).some((ans) => ans === true);
    onComplete(hasCrisisRisk);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={48} color={colors.primary.main} />
        <Text style={styles.title}>Safety Check</Text>
        <Text style={styles.description}>
          To ensure your safety, we'd like to ask you a few questions.
          Your answers are kept completely confidential.
        </Text>
      </View>

      <View style={styles.questionsContainer}>
        {CRISIS_QUESTIONS.map((q) => (
          <View key={q.id} style={styles.questionCard}>
            <Text style={styles.questionText}>{q.question}</Text>
            <View style={styles.answerButtons}>
              <TouchableOpacity
                style={[
                  styles.answerButton,
                  answers[q.id] === false && styles.answerButtonSelected,
                ]}
                onPress={() => handleAnswer(q.id, false)}
              >
                <Text
                  style={[
                    styles.answerButtonText,
                    answers[q.id] === false && styles.answerButtonTextSelected,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.answerButton,
                  answers[q.id] === true && styles.answerButtonSelected,
                  answers[q.id] === true && styles.answerButtonDanger,
                ]}
                onPress={() => handleAnswer(q.id, true)}
              >
                <Text
                  style={[
                    styles.answerButtonText,
                    answers[q.id] === true && styles.answerButtonTextSelected,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {showWarning && (
        <View style={styles.warningContainer}>
          <Ionicons name="alert-circle" size={24} color={colors.error} />
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>
              Your safety is our top priority
            </Text>
            <Text style={styles.warningText}>
              If you need help right now, please use the contacts below:
            </Text>
            {EMERGENCY_CONTACTS.map((contact, index) => (
              <Text key={index} style={styles.contactText}>
                • {contact.name}: {contact.phone}
              </Text>
            ))}
          </View>
        </View>
      )}

      <Button
        title="Continue"
        onPress={handleContinue}
        variant="primary"
        size="large"
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  questionsContainer: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  questionCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  questionText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  answerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  answerButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border.light,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  answerButtonSelected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main,
  },
  answerButtonDanger: {
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
  answerButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.text.primary,
  },
  answerButtonTextSelected: {
    color: colors.text.inverse,
  },
  warningContainer: {
    flexDirection: 'row',
    backgroundColor: colors.error,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  warningContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  warningTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.inverse,
    marginBottom: spacing.xs,
  },
  warningText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.inverse,
    marginBottom: spacing.sm,
  },
  contactText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.medium as any,
  },
});
