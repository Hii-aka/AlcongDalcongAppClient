import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DiaryList from '@/components/diary/DiaryList';
import { ProfileCard } from '@/components/diary/ProfileCard';
import MoodSelector from '@/components/diary/MoodSelector';
import { MoodType } from '@/constants/moods';
import { COLORS, SHADOWS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import useGetCoupleRequestAccepted from '@/hooks/queries/useGetCoupleRequestAccepted';

export default function DiaryHome() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const { data: couple, isLoading } = useGetCoupleRequestAccepted();

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log('[DiaryHome] Couple data:', {
      couple,
      firstMetDate: couple?.firstMetDate,
      isLoading
    });
  }, [couple, isLoading]);

  const HeaderComponent = useCallback(() => (
    <View className="pt-4">
      <ProfileCard 
        startDate={couple?.firstMetDate ?? null}
      />
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
          onPress={() => router.push('diary/all' as any)}
        >
          <Text className="text-base font-medium text-gray-600 mr-1">
            전체보기
          </Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.love} />
        </Pressable>
      </View>
    </View>
  ), [couple?.firstMetDate, selectedMood]);

  // 커플 데이터 로딩 중이거나 연결되지 않은 경우
  if (isLoading || !couple) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <LinearGradient
          colors={[COLORS.backgroundAlt, COLORS.background]}
          className="flex-1 pt-4 px-6"
        >
          <View className="flex-1 items-center justify-center">
            <View className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100 items-center w-full">
              <Ionicons name="book" size={64} color={COLORS.love} />
              <Text className="text-xl font-bold text-gray-800 mt-4 text-center">
                {isLoading ? "로딩 중..." : "아직 연인과 연결되지 않았어요"}
              </Text>
              <Text className="text-base text-gray-600 mt-2 text-center">
                연인과 함께 소중한 추억을{'\n'}
                기록하고 공유해보세요
              </Text>
              <Pressable
                className="mt-6 bg-white rounded-full py-3 px-6 border border-pink-100"
                style={SHADOWS.small}
                onPress={() => router.push('connect' as any)}
              >
                <Text className="text-base font-semibold text-pink-500">
                  연인 연결하기
                </Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background] as readonly [string, string]}
        className="flex-1"
      >
        <DiaryList 
          ListHeaderComponent={HeaderComponent}
          contentContainerStyle={{ 
            paddingBottom: Platform.OS === 'ios' ? 120 : 100 
          }}
        />
        <Pressable
          className={`absolute right-6 items-center justify-center ${Platform.OS === 'ios' ? 'bottom-24' : 'bottom-20'}`}
          style={[
            SHADOWS.medium,
            {
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: COLORS.love,
            }
          ]}
          onPress={() => router.push('/diary/post')}
        >
          <LinearGradient
            colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
            className="absolute w-full h-full rounded-full"
          />
          <Ionicons name="add" size={32} color="white" />
          <View className="absolute -right-1 -top-1 bg-white rounded-full p-1">
            <Ionicons name="heart" size={14} color={COLORS.love} />
          </View>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
} 