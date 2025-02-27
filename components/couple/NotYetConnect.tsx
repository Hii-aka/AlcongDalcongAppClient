import { COLORS } from '@/constants/theme';
import { SHADOWS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotYetConnectProps {
    isCoupleLoading: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    title?: string;
    description?: string;
}

function NotYetConnect({isCoupleLoading, icon = 'book', title = '아직 연인과 연결되지 않았어요', description = '연인과 함께 소중한 추억을\n기록하고 공유해보세요'}: NotYetConnectProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <LinearGradient
          colors={[COLORS.backgroundAlt, COLORS.background]}
          className="flex-1 pt-4 px-6"
        >
          <View className="flex-1 items-center justify-center">
            <View className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100 items-center w-full">
              <Ionicons name={icon} size={64} color={COLORS.love} />
              <Text className="text-xl font-bold text-gray-800 mt-4 text-center">
                {title}
              </Text>
              <Text className="text-base text-gray-600 mt-2 text-center">
                {description}
              </Text>
              <Pressable
                className="mt-6 bg-white rounded-full py-3 px-6 border border-pink-100"
                style={SHADOWS.small}
                onPress={() => router.push('/(main)/(tabs)/profile/couple')}
              >
                <Text className="text-base font-semibold text-pink-500">
                  연인 연결하기
                </Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

export default NotYetConnect;