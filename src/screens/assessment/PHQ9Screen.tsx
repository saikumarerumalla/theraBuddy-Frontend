import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/common/Button';
import { colors, spacing, typography} from '@/constants';
import { borderRadius } from '../../constants/spacing';

export const PHQ9Screen: React.FC = ({ navigation }: any) => {
  const [responses, setResponses] = useState<number[]>([]);

  const questions = [
    '物事に対してほとんど興味がない、または楽しめない',
    '気分が落ち込む、憂うつになる、または絶望的な気持ちになる',
    '寝つきが悪い、途中で目が覚める、または眠りすぎる',
    '疲れた感じがする、または気力がない',
    'あまり食欲がない、または食べ過ぎる',
    '自分はダメな人間だ、人生の落伍者だと気に病む、または自分自身あるいは家族に申し訳がないと感じる',
    '新聞を読む、またはテレビを見ることなどに集中することが難しい',
    '他人が気づくぐらいに動きや話し方が遅くなる。あるいはこの反対に、そわそわしたり、落ち着かず、普段よりも動き回ることがある',
    '死んだ方がましだ、あるいは自分を何らかの方法で傷つけようと思ったことがある',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>PHQ-9 うつ病評価スケール</Text>
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
