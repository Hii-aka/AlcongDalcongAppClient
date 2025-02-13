import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CalendarHome() {
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
  
  const renderWeekdays = () => (
    <View className="flex-row justify-between mb-2 px-2">
      {WEEKDAYS.map((day, index) => (
        <View key={day} className="flex-1 items-center">
          <Text className={`text-sm ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'}`}>
            {day}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderCalendarDays = () => (
    <View className="flex-row flex-wrap">
      {/* Previous month days */}
      {['28', '29', '30', '31'].map((day) => (
        <View key={day} className="w-[14.28%] aspect-square p-1">
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-300">{day}</Text>
          </View>
        </View>
      ))}
      
      {/* Current month days */}
      {[...Array(29)].map((_, index) => {
        const day = index + 1;
        const isToday = day === 14;
        const hasEvent = day === 9 || day === 17;
        
        return (
          <Pressable 
            key={day} 
            className="w-[14.28%] aspect-square p-1"
            onPress={() => router.push('/calendar/post')}
          >
            <View className={`flex-1 items-center justify-center rounded-full
              ${isToday ? 'bg-black' : ''}`}>
              <Text className={`text-base ${isToday ? 'text-white font-bold' : 'text-gray-800'}`}>
                {day}
              </Text>
              {hasEvent && (
                <View className="absolute bottom-0 w-1.5 h-1.5 bg-custom rounded-full" />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );

  const renderScheduledDates = () => (
    <View className="space-y-3">
      {[
        { date: '2월 14일', event: '강남 cgv 영화보기', time: '19:00' },
        { date: '2월 17일', event: '이태원 맛집투어', time: '18:30' },
      ].map(({ date, event, time }) => (
        <Pressable 
          key={date} 
          className="flex-row items-center p-4 bg-gray-50 rounded-xl"
          onPress={() => router.push('/calendar/post')}
        >
          <View className="w-2 h-12 bg-custom rounded-full mr-4" />
          <View className="flex-1">
            <Text className="text-base font-semibold">{date}</Text>
            <Text className="text-sm text-gray-600">{time}</Text>
            <Text className="text-sm text-gray-800 mt-1">{event}</Text>
          </View>
          <Pressable 
            className="p-2"
            onPress={(e) => {
              e.stopPropagation();
              router.push('/calendar/post');
            }}
          >
            <FontAwesome name="edit" size={20} color="#666" />
          </Pressable>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold">2024년 2월</Text>
          <View className="flex-row space-x-4">
            <Pressable>
              <FontAwesome name="chevron-left" size={20} color="#666" />
            </Pressable>
            <Pressable>
              <FontAwesome name="chevron-right" size={20} color="#666" />
            </Pressable>
          </View>
        </View>
          
        {/* Calendar Section */}
        <View className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          {renderWeekdays()}
          {renderCalendarDays()}
        </View>

        {/* Scheduled Dates Section */}
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">예정된 데이트</Text>
          </View>
          <ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20
            }}
          >
            {renderScheduledDates()}
          </ScrollView>
        </View>
      </View>
    </View>
  );
} 