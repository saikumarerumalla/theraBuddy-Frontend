import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography} from '@constants/index';
import { MoodEntry } from '@/types/mood.types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { ja } from 'date-fns/locale';
import { borderRadius } from '@/constants/spacing';

interface MoodCalendarProps {
  data: MoodEntry[];
  currentDate?: Date;
  onDatePress?: (date: Date) => void;
}

export const MoodCalendar: React.FC<MoodCalendarProps> = ({
  data,
  currentDate = new Date(),
  onDatePress,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getMoodForDate = (date: Date): MoodEntry | undefined => {
    return data.find((entry) => isSameDay(new Date(entry.date), date));
  };

  const getMoodColor = (mood?: number) => {
    if (!mood) return colors.background.secondary;
    if (mood <= 2) return colors.mood.veryPoor;
    if (mood <= 4) return colors.mood.poor;
    if (mood <= 6) return colors.mood.okay;
    if (mood <= 8) return colors.mood.good;
    return colors.mood.excellent;
  };

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {format(currentDate, 'yyyy年 M月', { locale: ja })}
      </Text>

      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {daysInMonth.map((day, index) => {
          const moodEntry = getMoodForDate(day);
          const mood = moodEntry?.overallMood;
          const isToday = isSameDay(day, new Date());

          return (
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
              onPress={() => onDatePress && onDatePress(day)}
              disabled={!onDatePress}
            >
              <View
                style={[
                  styles.dayCircle,
                  { backgroundColor: getMoodColor(mood) },
                  isToday && styles.todayCircle,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    mood && styles.dayTextWithMood,
                    isToday && styles.todayText,
                  ]}
                >
                  {format(day, 'd')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>気分スケール:</Text>
        <View style={styles.legendItems}>
          {[
            { label: '最悪', color: colors.mood.veryPoor },
            { label: '悪い', color: colors.mood.poor },
            { label: '普通', color: colors.mood.okay },
            { label: '良い', color: colors.mood.good },
            { label: '最高', color: colors.mood.excellent },
          ].map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  weekDayText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.secondary,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
  },
  dayCircle: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCircle: {
    borderWidth: 2,
    borderColor: colors.primary.dark,
  },
  dayText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  dayTextWithMood: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold as any,
  },
  todayText: {
    fontWeight: typography.fontWeight.bold as any,
  },
  legend: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  legendTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: spacing.xs,
  },
  legendText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
});
