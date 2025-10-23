import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/constants';
import { useTranslation } from 'react-i18next';
import { borderRadius } from '../../constants/spacing';
interface Exercise {
  id: string;
  name: string;
  nameJa: string;
  category: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  descriptionJa: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const exercises: Exercise[] = [
  {
    id: 'breathing_box',
    name: 'Box Breathing',
    nameJa: 'ボックス呼吸法',
    category: 'breathing',
    duration: 5,
    difficulty: 'beginner',
    description: '4-4-4-4 breathing pattern for relaxation',
    descriptionJa: 'リラックスのための4-4-4-4呼吸パターン',
    icon: 'fitness-outline',
  },
  {
    id: 'body_scan',
    name: 'Body Scan Meditation',
    nameJa: 'ボディスキャン瞑想',
    category: 'meditation',
    duration: 15,
    difficulty: 'beginner',
    description: 'Progressive body awareness meditation',
    descriptionJa: '段階的な身体意識の瞑想',
    icon: 'body-outline',
  },
  {
    id: 'thought_record',
    name: 'Thought Record',
    nameJa: '思考記録',
    category: 'cbt',
    duration: 10,
    difficulty: 'intermediate',
    description: 'Identify and challenge negative thoughts',
    descriptionJa: 'ネガティブな思考を特定し、挑戦する',
    icon: 'book-outline',
  },
  {
    id: 'mindful_walking',
    name: 'Mindful Walking',
    nameJa: 'マインドフル歩行',
    category: 'mindfulness',
    duration: 20,
    difficulty: 'beginner',
    description: 'Walking meditation practice',
    descriptionJa: '歩行瞑想の実践',
    icon: 'walk-outline',
  },
];

export const ExercisesScreen: React.FC = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'breathing', label: '呼吸法', icon: 'fitness-outline' },
    { id: 'meditation', label: '瞑想', icon: 'leaf-outline' },
    { id: 'cbt', label: 'CBT', icon: 'bulb-outline' },
    { id: 'mindfulness', label: 'マインドフルネス', icon: 'eye-outline' },
  ];

  const filteredExercises = selectedCategory
    ? exercises.filter((e) => e.category === selectedCategory)
    : exercises;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.text.secondary;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '初級';
      case 'intermediate':
        return '中級';
      case 'advanced':
        return '上級';
      default:
        return difficulty;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>カテゴリー</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                !selectedCategory && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text
                style={[
                  styles.categoryText,
                  !selectedCategory && styles.categoryTextActive,
                ]}
              >
                すべて
              </Text>
            </TouchableOpacity>

            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={18}
                  color={
                    selectedCategory === cat.id
                      ? colors.text.inverse
                      : colors.text.primary
                  }
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat.id && styles.categoryTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exercise List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>エクササイズ</Text>

          {filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => {
                console.log('Start exercise:', exercise.id);
              }}
            >
              <View style={styles.exerciseIcon}>
                <Ionicons
                  name={exercise.icon}
                  size={32}
                  color={colors.primary.main}
                />
              </View>

              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseName}>{exercise.nameJa}</Text>
                <Text style={styles.exerciseDescription}>
                  {exercise.descriptionJa}
                </Text>

                <View style={styles.exerciseMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={colors.text.secondary}
                    />
                    <Text style={styles.metaText}>{exercise.duration}分</Text>
                  </View>

                  <View
                    style={[
                      styles.difficultyBadge,
                      {
                        backgroundColor:
                          getDifficultyColor(exercise.difficulty) + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(exercise.difficulty) },
                      ]}
                    >
                      {getDifficultyLabel(exercise.difficulty)}
                    </Text>
                  </View>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.text.secondary}
              />
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  categoryChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium as any,
  },
  categoryTextActive: {
    color: colors.text.inverse,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  exerciseIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  exerciseDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium as any,
  },
});
