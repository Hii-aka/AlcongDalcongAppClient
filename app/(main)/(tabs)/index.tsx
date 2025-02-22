import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { COLORS, SHADOWS } from '@/constants/theme';
import { Image } from 'expo-image';

interface HeaderProps {
  userName?: string;
  profileImage?: string;
  notificationCount?: number;
}

function Header({ userName = "사용자", profileImage, notificationCount = 0 }: HeaderProps) {
  return (
    <View className="px-6 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-3">
          <View className="relative">
            <Image
              source={profileImage || require('@/assets/images/default-profile.png')}
              className="w-12 h-12 rounded-full bg-gray-200"
              contentFit="cover"
              transition={1000}
            />
            <View className="absolute -right-1 -bottom-1">
              <View className="bg-green-400 w-4 h-4 rounded-full border-2 border-white" />
            </View>
          </View>
          <View>
            <Text className="text-sm text-gray-500">안녕하세요!</Text>
            <Text className="text-lg font-bold text-gray-800">{userName}님</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-4">
          <Pressable
            onPress={() => router.push('/search')}
            className="w-10 h-10 items-center justify-center rounded-full bg-white"
            style={SHADOWS.small}
          >
            <Ionicons name="search" size={22} color={COLORS.love} />
          </Pressable>
          <Pressable
            onPress={() => router.push('/notifications')}
            className="relative w-10 h-10 items-center justify-center rounded-full bg-white"
            style={SHADOWS.small}
          >
            <Ionicons name="notifications" size={22} color={COLORS.love} />
            {notificationCount > 0 && (
              <View className="absolute -right-1 -top-1 bg-pink-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                <Text className="text-xs text-white font-bold">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function QuickActions() {
  const actions = [
    { icon: 'heart', label: '매칭', route: '/matching' },
    { icon: 'calendar', label: '일정', route: '/calendar' },
    { icon: 'gift', label: '선물', route: '/gifts' },
    { icon: 'images', label: '앨범', route: '/album' },
  ];

  return (
    <View className="px-6 py-2">
      <View className="flex-row justify-between bg-white rounded-3xl p-4 border border-pink-100" style={SHADOWS.small}>
        {actions.map((action, index) => (
          <Pressable
            key={action.route}
            onPress={() => router.push(action.route)}
            className="items-center"
          >
            <View className="w-12 h-12 rounded-2xl bg-pink-50 items-center justify-center mb-1">
              <View className="relative">
                <Ionicons name={action.icon as any} size={24} color={COLORS.love} />
                <View className="absolute -right-1 -top-1">
                  <Ionicons name="heart" size={12} color={COLORS.love} />
                </View>
              </View>
            </View>
            <Text className="text-sm font-medium text-gray-700">{action.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function Home() {
  const { width } = useWindowDimensions();
  const [userName] = useState("민지");
  const [notificationCount] = useState(5);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <Header
            userName={userName}
            notificationCount={notificationCount}
          />
          <QuickActions />
          
          {/* Add more content sections here */}
          <View className="p-6">
            <View className="bg-white rounded-3xl p-6 border border-pink-100" style={SHADOWS.small}>
              <Text className="text-xl font-bold text-gray-800 mb-4">
                오늘의 할 일
              </Text>
              {/* Add your todo list or other content here */}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
} 