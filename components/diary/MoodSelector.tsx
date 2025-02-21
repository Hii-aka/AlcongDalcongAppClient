import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { MoodType, MOODS } from '../../constants/moods';

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onMoodSelect: (mood: MoodType) => void;
}

const MOOD_ICONS = {
  happy: 'heart',
  good: 'heart-circle',
  neutral: 'heart-outline',
  sad: 'heart-dislike',
  angry: 'heart-dislike-circle',
} as const;

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 기분</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moodList}
      >
        {MOODS.map((mood) => (
          <Pressable
            key={mood.id}
            style={({ pressed }) => [
              styles.moodItem,
              selectedMood === mood.id && styles.selectedMood,
              pressed && styles.pressedMood,
            ]}
            onPress={() => onMoodSelect(mood.id)}
          >
            <View style={[
              styles.iconContainer,
              selectedMood === mood.id && styles.selectedIconContainer,
              { backgroundColor: mood.bgColor },
            ]}>
              <Ionicons
                name={MOOD_ICONS[mood.id as keyof typeof MOOD_ICONS]}
                size={24}
                color={selectedMood === mood.id ? COLORS.background : mood.activeColor}
              />
            </View>
            <Text style={[
              styles.moodText,
              selectedMood === mood.id && styles.selectedMoodText,
              { color: selectedMood === mood.id ? mood.activeColor : COLORS.textLight },
            ]}>
              {mood.text}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.xl,
  },
  moodList: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  moodItem: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  selectedIconContainer: {
    backgroundColor: COLORS.love,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectedMoodText: {
    fontWeight: '600',
  },
  selectedMood: {
    transform: [{ scale: 1.05 }],
  },
  pressedMood: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});