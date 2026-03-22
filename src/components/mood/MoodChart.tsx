import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { colors, spacing, typography } from '@/constants';
import { MoodEntry } from '@/types/mood.types';
import { format } from 'date-fns';


interface MoodChartProps {
  data: MoodEntry[];
}

export const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const chartData = data.map((entry) => ({
    x: new Date(entry.date),
    y: entry.overallMood,
  })).reverse();

  if (chartData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Trend</Text>

      <VictoryChart
        width={Dimensions.get('window').width - 32}
        height={250}
        theme={VictoryTheme.material}
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        <VictoryAxis
          tickFormat={(date) => format(date, 'M/d')}
          style={{
            tickLabels: { fontSize: 10, fill: colors.text.secondary },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          style={{
            tickLabels: { fontSize: 10, fill: colors.text.secondary },
          }}
        />
        <VictoryLine
          data={chartData}
          style={{
            data: { stroke: colors.primary.main, strokeWidth: 3 },
          }}
          interpolation="natural"
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
});
