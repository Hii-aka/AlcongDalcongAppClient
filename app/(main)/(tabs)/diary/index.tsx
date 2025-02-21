import React, { useState, useCallback } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DiaryList from '@/components/diary/DiaryList';
import { ProfileCard } from '@/components/diary/ProfileCard';
import MoodSelector from '@/components/diary/MoodSelector';
import { MoodType } from '@/constants/moods';
import { COLORS, SHADOWS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function DiaryHome() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  // TODO: 실제 연인 연결 상태를 가져오는 로직으로 대체
  const [isConnected, setIsConnected] = useState(false);

  React.useEffect(() => {
    // TODO: 실제 연인 연결 상태 확인 로직
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
  }, []);

  const UnconnectedView = () => (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1 pt-4 px-6"
      >
        <View className="flex-1 items-center justify-center">
          <View className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100 items-center w-full">
            <Ionicons name="book" size={64} color={COLORS.love} />
            <Text className="text-xl font-bold text-gray-800 mt-4 text-center">
              아직 연인과 연결되지 않았어요
            </Text>
            <Text className="text-base text-gray-600 mt-2 text-center">
              연인과 함께 소중한 추억을{'\n'}
              기록하고 공유해보세요
            </Text>
            <Pressable
              className="mt-6 bg-white rounded-full py-3 px-6 border border-pink-100"
              style={SHADOWS.small}
              onPress={() => router.push('/connect')}
            >
              <Text className="text-base font-semibold text-pink-500">
                연인 연결하기
              </Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const HeaderComponent = useCallback(() => (
    <View className="pt-4">
      <ProfileCard daysCount={365} daysUntilAnniversary={7} />
      <MoodSelector 
        selectedMood={selectedMood}
        onMoodSelect={setSelectedMood}
      />
      <View className="px-6 mb-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Ionicons name="book" size={24} color={COLORS.love} />
          <Text className="text-xl font-bold text-gray-800 ml-2">
            우리의 일기
          </Text>
        </View>
        <Pressable 
          className="flex-row items-center py-2 px-4 rounded-full bg-white"
          style={SHADOWS.small}
          onPress={() => router.push('/diary/all')}
        >
          <Text className="text-base font-medium text-gray-600 mr-1">
            전체보기
          </Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.love} />
        </Pressable>
      </View>
    </View>
  ), [selectedMood]);

  if (!isConnected) {
    return <UnconnectedView />;
  }

  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        <DiaryList 
          ListHeaderComponent={HeaderComponent}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
        <Pressable
          className="absolute right-6 bottom-6 w-14 h-14 rounded-full bg-pink-500 items-center justify-center"
          style={SHADOWS.medium}
          onPress={() => router.push('/diary/post')}
        >
          <Ionicons name="add" size={32} color="white" />
          <View className="absolute -right-1 -top-1">
            <Ionicons name="heart" size={16} color={COLORS.love} />
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
} 