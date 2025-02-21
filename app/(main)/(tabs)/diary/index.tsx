import React, { useState, useCallback } from 'react';
import { View, Text, Image, Pressable, ScrollView, Animated } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import DiaryList from '@/components/diary/DiaryList';
import { ProfileCard } from '@/components/diary/ProfileCard';
import MoodSelector from '@/components/diary/MoodSelector';
import { MOODS, MoodType } from '@/constants/moods';

export default function DiaryHome() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const HeaderComponent = useCallback(() => (
    <>
      <ProfileCard daysCount={365} daysUntilAnniversary={7} />
      <MoodSelector 
        selectedMood={selectedMood}
        onMoodSelect={setSelectedMood}
      />
      <View className="px-5 mb-4 flex-row justify-between items-center">
        <Text className="text-xl font-bold">최근 일기</Text>
        <Pressable 
          className="py-2 px-3 rounded-full bg-gray-50"
          accessible={true}
          accessibilityLabel="전체 일기 보기"
        >
          <Text className="text-sm text-gray-600">전체보기</Text>
        </Pressable>
      </View>
    </>
  ), [selectedMood]);

  return (
    <View className="flex-1 bg-gray-50">
      <DiaryList ListHeaderComponent={HeaderComponent} />
    </View>
  );
} 