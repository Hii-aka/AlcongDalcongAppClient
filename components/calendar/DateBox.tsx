import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface DateBoxProps {
  date: number;
  isToday: boolean;
  hasSchedule: boolean;
  selectedDate: number;
  onPressDate: (date: number) => void;
  width: number;
}

function DateBox({ date, isToday, hasSchedule, selectedDate, onPressDate, width }: DateBoxProps) {
  if (date < 1) return <View style={{ width, aspectRatio: 1 }} />;

  const isSelected = date === selectedDate;
  
  return (
    <Pressable
      onPress={() => onPressDate(date)}
      style={{ width }}
    >
      <View className={`
        aspect-square items-center justify-center m-0.5 rounded-2xl
        ${isSelected ? 'overflow-hidden' : ''}
        ${!isSelected && hasSchedule ? 'bg-pink-50' : ''}
      `}>
        {isSelected ? (
          <LinearGradient
            colors={[COLORS.love, COLORS.primary]}
            className="absolute w-full h-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ) : null}
        
        <View className={`
          items-center justify-center
          ${isToday && !isSelected ? 'bg-pink-100 rounded-full p-1' : ''}
        `}>
          <Text className={`
            text-base font-medium
            ${isSelected ? 'text-white' : 'text-gray-700'}
            ${date === 1 ? 'mt-1' : ''}
          `}>
            {date}
          </Text>
          
          {hasSchedule && !isSelected && (
            <View className="absolute -bottom-3">
              <Ionicons 
                name="heart" 
                size={12} 
                color={COLORS.love}
              />
            </View>
          )}
          
          {isToday && !isSelected && (
            <View className="absolute -top-1 -right-1">
              <View className="bg-pink-500 rounded-full w-2 h-2" />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default DateBox;