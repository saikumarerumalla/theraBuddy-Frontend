import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/common/Button';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { OnboardingStep } from '@/components/onboarding/OnboardingStep';
import { CrisisAssessment } from '@/components/onboarding/CrisisAssessment';
import { colors, spacing, typography } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';

const TOTAL_STEPS = 5;

export const OnboardingScreen: React.FC = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { updateUserProfile } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    ageRange: '',
    gender: '',
    concerns: [] as string[],
    hasCrisisRisk: false,
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await updateUserProfile({
        onboardingCompleted: true,
        ...onboardingData,
      });
      // Navigation will be handled by auth state change
    } catch (error: any) {
      Alert.alert('エラー', '設定の保存に失敗しました');
    }
  };

  const handleCrisisComplete = (hasCrisisRisk: boolean) => {
    setOnboardingData({ ...onboardingData, hasCrisisRisk });
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep
            title="ようこそ"
            description="あなたの心のサポートを始めましょう。いくつか質問させてください。"
          >
            <View style={styles.stepContent}>
              <Text style={styles.infoText}>
                このアプリは、あなたの心の健康をサポートするためのツールです。
                以下の質問に答えることで、より適切なサポートを提供できます。
              </Text>
              <Text style={styles.infoText}>
                すべての情報は安全に保管され、あなたのプライバシーは完全に保護されます。
              </Text>
            </View>
          </OnboardingStep>
        );
      case 2:
        return (
          <OnboardingStep title="安全確認">
            <CrisisAssessment onComplete={handleCrisisComplete} />
          </OnboardingStep>
        );
      case 3:
        return (
          <OnboardingStep
            title="基本情報"
            description="あなたについて教えてください"
          >
            <View style={styles.stepContent}>
              <Text style={styles.placeholder}>
                ここに年齢層、性別などの選択肢を表示
              </Text>
            </View>
          </OnboardingStep>
        );
      case 4:
        return (
          <OnboardingStep
            title="現在の悩み"
            description="当てはまるものを選択してください"
          >
            <View style={styles.stepContent}>
              <Text style={styles.placeholder}>
                ここに悩みの選択肢を表示（ストレス、不安、うつなど）
              </Text>
            </View>
          </OnboardingStep>
        );
      case 5:
        return (
          <OnboardingStep
            title="準備完了"
            description="設定が完了しました"
          >
            <View style={styles.stepContent}>
              <Text style={styles.infoText}>
                すべての設定が完了しました。今すぐサポートを開始できます。
              </Text>
            </View>
          </OnboardingStep>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {renderStep()}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {currentStep > 1 && currentStep !== 2 && (
            <Button
              title={t('common.back')}
              onPress={handleBack}
              variant="outline"
              size="large"
              fullWidth
            />
          )}
          {currentStep !== 2 && (
            <Button
              title={currentStep === TOTAL_STEPS ? t('common.done') : t('common.next')}
              onPress={handleNext}
              variant="primary"
              size="large"
              fullWidth
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: spacing.lg,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.lg,
  },
  placeholder: {
    fontSize: typography.fontSize.base,
    color: colors.text.disabled,
    textAlign: 'center',
    padding: spacing.xl,
  },
  buttonContainer: {
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
});
