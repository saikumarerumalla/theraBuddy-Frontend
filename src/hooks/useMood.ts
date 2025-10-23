import { useState, useEffect } from 'react';
import { useMoodStore } from '@/store/moodStore';
import { MoodEntry } from '@/types/mood.types';
import { moodApi } from '../api/mood';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export const useMood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    moodHistory,
    loadMoodHistory,
    createMoodEntry,
  } = useMoodStore();
  const [todayEntry, setTodayEntry] = useState<MoodEntry | null>(null);

  useEffect(() => {
    loadMoodEntries();
  }, []);

  const loadMoodEntries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loadMoodHistory();

      // Check if there's an entry for today
      const today = format(new Date(), 'yyyy-MM-dd');
      const todayMood = moodHistory.find((entry) => entry.date === today);
      if (todayMood) {
        setTodayEntry(todayMood);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load mood entries');
    } finally {
      setIsLoading(false);
    }
  };

  const saveMoodEntry = async (entry: Omit<MoodEntry, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Use store action to create the entry; then refresh history to stay consistent
      await createMoodEntry(entry as any);
      await loadMoodHistory();

      const today = format(new Date(), 'yyyy-MM-dd');
      if (entry.date === today) {
        const updatedToday = (moodHistory || []).find((e) => e.date === today) || null;
        setTodayEntry(updatedToday);
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to save mood entry');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodStats = () => {
    if (moodHistory.length === 0) {
      return {
        averageMood: 0,
        averageAnxiety: 0,
        averageEnergy: 0,
        averageSleep: 0,
        totalEntries: 0,
      };
    }

    const total = moodHistory.length;
    const sum = moodHistory.reduce(
      (acc, entry) => ({
        mood: acc.mood + entry.overallMood,
        anxiety: acc.anxiety + (entry.anxietyLevel || 0),
        energy: acc.energy + (entry.energyLevel || 0),
        sleep: acc.sleep + (entry.sleepQuality || 0),
      }),
      { mood: 0, anxiety: 0, energy: 0, sleep: 0 }
    );

    return {
      averageMood: Number((sum.mood / total).toFixed(1)),
      averageAnxiety: Number((sum.anxiety / total).toFixed(1)),
      averageEnergy: Number((sum.energy / total).toFixed(1)),
      averageSleep: Number((sum.sleep / total).toFixed(1)),
      totalEntries: total,
    };
  };

  const getWeeklyEntries = () => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    return moodHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart && entryDate <= weekEnd;
    });
  };

  const getMonthlyEntries = () => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    return moodHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= monthStart && entryDate <= monthEnd;
    });
  };

  return {
    entries: moodHistory,
    todayEntry,
    isLoading,
    error,
    saveMoodEntry,
    loadMoodEntries,
    getMoodStats,
    getWeeklyEntries,
    getMonthlyEntries,
  };
};
