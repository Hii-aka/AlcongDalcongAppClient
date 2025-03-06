import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '@/constants/theme';
import { getTimeString } from '@/utils/date';
interface Schedule {
  id: number;
  title: string;
  time: string;
  location: string;
}

interface ScheduledDateProps {
  selectedDate: number;
  schedules: Schedule[];
}

export default function ScheduledDate({ selectedDate, schedules }: ScheduledDateProps) {
  if (!selectedDate) return null;

  return (
    <View className="mt-4">
      <View className="flex-row items-center mb-4">
        <Ionicons name="calendar" size={20} color={COLORS.love} />
        <Text className="text-lg font-bold text-gray-800 ml-2">
          {selectedDate}일의 데이트
        </Text>
      </View>

      <View>
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <Pressable
              key={schedule.id}
              className="bg-white rounded-2xl p-4 mb-3 border border-pink-100"
              style={SHADOWS.small}
            >
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                {schedule.title}
              </Text>
              
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Ionicons name="time" size={16} color={COLORS.love} />
                  <Text className="text-gray-600 ml-2">
                    {getTimeString(schedule.time)}
                  </Text>
                </View>
                
                <View className="flex-row items-center">
                  <Ionicons name="location" size={16} color={COLORS.love} />
                  <Text className="text-gray-600 ml-2">
                    {schedule.location}
                  </Text>
                </View>
              </View>

              <View className="absolute -right-1 -top-1">
                <Ionicons name="heart" size={16} color={COLORS.love} />
              </View>
            </Pressable>
          ))
        ) : (
          <View className="bg-white rounded-2xl p-6 items-center border border-pink-100">
            <Ionicons name="calendar-outline" size={48} color={COLORS.love} />
            <Text className="text-base text-gray-600 mt-3 text-center">
              아직 데이트 일정이 없어요{'\n'}
              새로운 데이트를 계획해보세요!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}