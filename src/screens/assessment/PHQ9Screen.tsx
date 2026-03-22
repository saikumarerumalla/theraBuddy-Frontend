import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/common/Button';
import { colors, spacing, typography} from '@/constants';
import { borderRadius } from '../../constants/spacing';

export const PHQ9Screen: React.FC = ({ navigation }: any) => {
  const [responses, setResponses] = useState<number[]>([]);

  const questions = [
    'Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless',
    'Trouble falling or staying asleep, or sleeping too much',
    'Feeling tired or having little energy',
    'Poor appetite or overeating',
    'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    'Trouble concentrating on things, such as reading the newspaper or watching television',
    'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    'Thoughts that you would be better off dead, or of hurting yourself in some way',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>PHQ-9 Depression Assessment</Text>
        <Text style={styles.description}>
          Over the last 2 weeks, how often have you been bothered by the following problems?
        </Text>

        <View style={styles.questionsContainer}>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionCard}>
              <Text style={styles.questionText}>
                {index + 1}. {question}
              </Text>
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>Response options will be displayed here</Text>
              </View>
            </View>
          ))}
        </View>

        <Button
          title="Submit"
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
