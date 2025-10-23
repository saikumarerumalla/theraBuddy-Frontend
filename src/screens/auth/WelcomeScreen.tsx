import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/common/Button';
import { colors, spacing, typography } from '@/constants';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🌸</Text>
          <Text style={styles.title}>{t('auth.welcome')}</Text>
          <Text style={styles.subtitle}>{t('auth.welcomeMessage')}</Text>
        </View>

        <View style={styles.illustration}>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.buttons}>
          <Button
            title={t('auth.register')}
            onPress={() => navigation.navigate('Register')}
            variant="primary"
            size="large"
            fullWidth
          />

          <Button
            title={t('auth.login')}
            onPress={() => navigation.navigate('Login')}
            variant="outline"
            size="large"
            fullWidth
          />

          <Button
            title={t('auth.anonymous')}
            onPress={() => navigation.navigate('Onboarding')}
            variant="text"
            size="medium"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing['2xl'] || spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['3xl'] || typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: colors.primary.light,
    borderRadius: 100,
  },
  buttons: {
    gap: spacing.md,
  },
});
