import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

interface DateBoxProps {
    date: number;
    isToday: boolean;
    hasSchedule: boolean;
    selectedDate: number;
    onPressDate: (date: number) => void;
    isPreviousMonth?: boolean;
}

function DateBox({
    date,
    isToday,
    hasSchedule,
    selectedDate,
    onPressDate,
    isPreviousMonth
}: DateBoxProps) {
    
    return (
        <Pressable 
            onPress={() => onPressDate(date)}
            className="w-[14.28%] aspect-square p-1"
        >
            {date > 0 && (
                <View className={`flex-1 items-center justify-center rounded-full
                    ${isToday ? 'bg-pink-100 border-2 border-pink-400' : ''}
                    ${selectedDate === date && !isToday ? 'bg-pink-50' : ''}`}
                >
                    <Text 
                        className={`text-base
                            ${isToday ? 'text-pink-500 font-bold' : ''}
                            ${isPreviousMonth ? 'text-gray-300' : 'text-gray-600'}
                            ${!isToday && !isPreviousMonth && selectedDate === date ? 'text-pink-500 font-semibold' : ''}`}
                    >
                        {date}
                    </Text>
                    {hasSchedule && (
                        <View className="absolute -bottom-1">
                            <FontAwesome5 
                                name="heart" 
                                size={8} 
                                color={isToday ? '#EC4899' : '#EC4899'} 
                            />
                        </View>
                    )}
                </View>
            )}
        </Pressable>
    );
}

export default DateBox;