import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

interface ProfileStats {
  daysCount: string;
  diaryCount: number;
  photoCount: number;
  email: string;
  coupleCode: string;
}

interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

export function ProfileView({ stats }: { stats: ProfileStats }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* 프로필 헤더 */}
        <View className="items-center pt-6 pb-4">
          <Text className="text-xl font-semibold">{stats.daysCount}</Text>
          <Text className="text-pink-500 mt-1">
            연인과 함께한지 1일
          </Text>
        </View>

        {/* 우리의 기록 섹션 */}
        <View className="mx-5 bg-white rounded-2xl p-5 shadow-sm">
          <View className="flex-row items-center mb-4">
            <Ionicons name="heart" size={20} color={COLORS.love} />
            <Text className="text-lg font-semibold ml-2">우리의 기록</Text>
          </View>
          <View className="space-y-4">
            <InfoRow 
              icon="calendar"
              label="처음 만난 날"
              value={stats.daysCount}
            />
            <InfoRow 
              icon="book"
              label="함께한 일기"
              value={`${stats.diaryCount}개`}
            />
            <InfoRow 
              icon="images"
              label="공유한 사진"
              value={`${stats.photoCount}장`}
            />
          </View>
        </View>

        {/* 내 정보 섹션 */}
        <View className="mx-5 mt-5 bg-white rounded-2xl p-5 shadow-sm">
          <View className="flex-row items-center mb-4">
            <Ionicons name="person" size={20} color={COLORS.love} />
            <Text className="text-lg font-semibold ml-2">내 정보</Text>
          </View>
          <View className="space-y-4">
            <InfoRow 
              icon="mail"
              label="이메일"
              value={stats.email}
            />
            <InfoRow 
              icon="key"
              label="연인 코드"
              value={stats.coupleCode}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={18} color="#666" />
        <Text className="text-gray-500 ml-3">{label}</Text>
      </View>
      <Text className="text-gray-700">{value}</Text>
    </View>
  );
} 