import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import SearchLocationScreen from '@/components/date/SearchLocationScreen';


export default function CalendarPost() {
  

 

  const handleSave = () => {
    // TODO: 일정 저장 로직 구현
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="mb-4">
            <Text className="text-lg font-bold">데이트 일정 추가</Text>
          </View>
          
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                일정 제목
              </Text>
              <TextInput
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="데이트 제목을 입력하세요"
              />
            </View>

            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  날짜
                </Text>
                <TextInput
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="YYYY-MM-DD"
                />
              </View>
              
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  시간
                </Text>
                <TextInput
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="HH:MM"
                />
              </View>
            </View>

            <View className="relative">
              <SearchLocationScreen />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                메모
              </Text>
              <TextInput
                className="w-full border border-gray-200 rounded-lg px-3 py-2 h-24"
                multiline
                numberOfLines={4}
                placeholder="상세 내용을 입력하세요"
                textAlignVertical="top"
              />
            </View>

            <Pressable 
              className="w-full bg-custom py-3 rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-white text-center font-medium">
                일정 추가하기
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-sm p-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold">다가오는 데이트</Text>
          </View>
          
          <View className="border border-gray-200 rounded-lg p-4">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="font-medium">롯데월드 데이트</Text>
                <Text className="text-sm text-gray-500 mt-1">
                  2024년 2월 14일 오후 2:00
                </Text>
                <Text className="text-sm text-gray-500">
                  잠실역 2번 출구
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 