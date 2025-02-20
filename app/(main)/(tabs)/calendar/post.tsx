import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import SearchLocationScreen from '@/components/date/SearchLocationScreen';

export default function CalendarPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [memo, setMemo] = useState('');

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
        <View className="bg-white rounded-2xl shadow-sm p-5 mb-4 border border-pink-100">
          <View className="flex-row items-center mb-6">
            <FontAwesome5 name="heart" size={20} color="#EC4899" />
            <Text className="text-xl font-bold ml-2 text-gray-800">
              새로운 데이트 일정
            </Text>
          </View>
          
          <View className="space-y-5">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                <FontAwesome5 name="pencil-alt" size={12} color="#EC4899" className="mr-1" />
                {" "}어떤 데이트인가요?
              </Text>
              <TextInput
                className="w-full border border-pink-100 rounded-xl px-4 py-3 bg-pink-50/30"
                placeholder="데이트 제목을 입력해주세요"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                  <FontAwesome5 name="calendar-alt" size={12} color="#EC4899" className="mr-1" />
                  {" "}날짜
                </Text>
                <Pressable className="border border-pink-100 rounded-xl px-4 py-3 bg-pink-50/30">
                  <Text className="text-gray-600">{date || 'YYYY-MM-DD'}</Text>
                </Pressable>
              </View>
              
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                  <FontAwesome5 name="clock" size={12} color="#EC4899" className="mr-1" />
                  {" "}시간
                </Text>
                <Pressable className="border border-pink-100 rounded-xl px-4 py-3 bg-pink-50/30">
                  <Text className="text-gray-600">{time || 'HH:MM'}</Text>
                </Pressable>
              </View>
            </View>

            <View className="relative">
              <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                <FontAwesome5 name="map-marker-alt" size={12} color="#EC4899" className="mr-1" />
                {" "}어디서 만날까요?
              </Text>
              <SearchLocationScreen />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                <FontAwesome5 name="sticky-note" size={12} color="#EC4899" className="mr-1" />
                {" "}메모하기
              </Text>
              <TextInput
                className="w-full border border-pink-100 rounded-xl px-4 py-3 h-24 bg-pink-50/30"
                multiline
                numberOfLines={4}
                placeholder="데이트 계획을 자유롭게 메모해보세요"
                textAlignVertical="top"
                value={memo}
                onChangeText={setMemo}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <Pressable 
              className="w-full bg-pink-500 py-4 rounded-xl mt-4 flex-row items-center justify-center space-x-2"
              onPress={handleSave}
            >
              <FontAwesome5 name="heart" size={16} color="white" />
              <Text className="text-white text-base font-semibold">
                데이트 일정 추가하기
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="bg-white rounded-2xl shadow-sm p-5 border border-pink-100">
          <View className="flex-row items-center mb-4">
            <FontAwesome5 name="calendar-heart" size={20} color="#EC4899" />
            <Text className="text-xl font-bold ml-2 text-gray-800">다가오는 데이트</Text>
          </View>
          
          <View className="border border-pink-100 rounded-xl p-4 bg-pink-50/30">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="font-semibold text-gray-800 text-base">롯데월드 데이트</Text>
                <View className="flex-row items-center mt-2">
                  <FontAwesome5 name="calendar-alt" size={12} color="#EC4899" />
                  <Text className="text-sm text-gray-600 ml-2">
                    2024년 2월 14일 오후 2:00
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <FontAwesome5 name="map-marker-alt" size={12} color="#EC4899" />
                  <Text className="text-sm text-gray-600 ml-2">
                    잠실역 2번 출구
                  </Text>
                </View>
              </View>
              <FontAwesome5 name="heart" size={20} color="#EC4899" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 