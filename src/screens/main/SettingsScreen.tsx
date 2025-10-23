import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/constants';
import { borderRadius } from '../../constants/spacing';

export const SettingsScreen: React.FC = () => {
  const settingsItems = [
    {
      id: 'account',
      icon: 'person-outline',
      title: 'アカウント設定',
      onPress: () => console.log('Account settings'),
    },
    {
      id: 'notifications',
      icon: 'notifications-outline',
      title: '通知',
      onPress: () => console.log('Notifications'),
    },
    {
      id: 'privacy',
      icon: 'lock-closed-outline',
      title: 'プライバシーとセキュリティ',
      onPress: () => console.log('Privacy'),
    },
    {
      id: 'language',
      icon: 'language-outline',
      title: '言語',
      onPress: () => console.log('Language'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>設定</Text>

        <View style={styles.section}>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingItem}
              onPress={item.onPress}
            >
              <View style={styles.settingLeft}>
                <Ionicons name={item.icon as any} size={24} color={colors.text.primary} />
                <Text style={styles.settingTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          ))}
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
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  section: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingTitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
});
