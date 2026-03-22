import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, spacing, typography } from '@/constants';

interface MoodSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  showLabels?: boolean;
  minLabel?: string;
  maxLabel?: string;
}

export const MoodSlider: React.FC<MoodSliderProps> = ({
  label,
  value,
  onValueChange,
  minimumValue = 1,
  maximumValue = 10,
  step = 1,
  showLabels = true,
  minLabel = 'Very Poor',
  maxLabel = 'Very Good',
}) => {
  const getMoodColor = (val: number) => {
    if (val <= 2) return colors.mood.veryPoor;
    if (val <= 4) return colors.mood.poor;
    if (val <= 6) return colors.mood.okay;
    if (val <= 8) return colors.mood.good;
    return colors.mood.excellent;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.valueBadge, { backgroundColor: getMoodColor(value) }]}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={getMoodColor(value)}
        maximumTrackTintColor={colors.border.light}
        thumbTintColor={getMoodColor(value)}
      />

      {showLabels && (
        <View style={styles.labels}>
          <Text style={styles.labelText}>{minLabel}</Text>
          <Text style={styles.labelText}>{maxLabel}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.text.primary,
  },
  valueBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.inverse,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  labelText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
});
