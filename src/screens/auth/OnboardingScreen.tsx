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
      Alert.alert('Error', 'Failed to save settings');
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
            title="Welcome"
            description="Let's begin your mental wellness journey. We'd like to ask you a few questions."
          >
            <View style={styles.stepContent}>
              <Text style={styles.infoText}>
                This app is a tool to support your mental health.
                By answering the following questions, we can provide more personalized support.
              </Text>
              <Text style={styles.infoText}>
                All information is securely stored and your privacy is fully protected.
              </Text>
            </View>
          </OnboardingStep>
        );
      case 2:
        return (
          <OnboardingStep title="Safety Check">
            <CrisisAssessment onComplete={handleCrisisComplete} />
          </OnboardingStep>
        );
      case 3:
        return (
          <OnboardingStep
            title="Basic Information"
            description="Tell us about yourself"
          >
            <View style={styles.stepContent}>
              <Text style={styles.placeholder}>
                Age range, gender, and other options will be displayed here
              </Text>
            </View>
          </OnboardingStep>
        );
      case 4:
        return (
          <OnboardingStep
            title="Current Concerns"
            description="Select all that apply"
          >
            <View style={styles.stepContent}>
              <Text style={styles.placeholder}>
                Concern options will be displayed here (stress, anxiety, depression, etc.)
              </Text>
            </View>
          </OnboardingStep>
        );
      case 5:
        return (
          <OnboardingStep
            title="All Set!"
            description="Setup is complete"
          >
            <View style={styles.stepContent}>
              <Text style={styles.infoText}>
                All settings are complete. You can start receiving support right away.
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
