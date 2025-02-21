import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, SPACING } from '../../../../constants/theme';
import DiaryList from '@/components/diary/DiaryList';
import { ProfileCard } from '@/components/diary/ProfileCard';
import MoodSelector from '@/components/diary/MoodSelector';
import { MOODS, MoodType } from '@/constants/moods';
import { Link } from 'expo-router';

export default function DiaryHome() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const HeaderComponent = useCallback(() => (
    <View style={{ paddingBottom: SPACING.md }}>
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        style={{ paddingTop: SPACING.xl }}
      >
        <ProfileCard daysCount={365} daysUntilAnniversary={7} />
        <MoodSelector 
          selectedMood={selectedMood}
          onMoodSelect={setSelectedMood}
        />
        <View style={{ 
          paddingHorizontal: SPACING.xl,
          marginBottom: SPACING.md,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{ 
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.text,
          }}>
            최근 일기
          </Text>
          <Link href="/(main)/(tabs)/diary/all" asChild>
            <Pressable 
              style={({ pressed }) => [
                {
                  paddingVertical: SPACING.xs,
                  paddingHorizontal: SPACING.sm,
                  borderRadius: 99,
                  backgroundColor: pressed ? COLORS.backgroundAlt : COLORS.background,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SPACING.xs,
                  ...SHADOWS.small,
                },
              ]}
              accessible={true}
              accessibilityLabel="전체 일기 보기"
            >
              <Text style={{ 
                fontSize: 14,
                color: COLORS.love,
                fontWeight: '600',
              }}>
                전체보기
              </Text>
              <Ionicons 
                name="chevron-forward" 
                size={16} 
                color={COLORS.love}
              />
            </Pressable>
          </Link>
        </View>
      </LinearGradient>
    </View>
  ), [selectedMood]);

  return (
    <View style={{ 
      flex: 1,
      backgroundColor: COLORS.background,
    }}>
      <DiaryList ListHeaderComponent={HeaderComponent} />
      <Link href="/(main)/(tabs)/diary/post" asChild>
        <Pressable
          style={({ pressed }) => [
            {
              position: 'absolute',
              right: SPACING.xl,
              bottom: SPACING.xl,
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: COLORS.love,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ scale: pressed ? 0.95 : 1 }],
              ...SHADOWS.medium,
            },
          ]}
        >
          <Ionicons 
            name="add" 
            size={32} 
            color={COLORS.background}
          />
        </Pressable>
      </Link>
    </View>
  );
} 