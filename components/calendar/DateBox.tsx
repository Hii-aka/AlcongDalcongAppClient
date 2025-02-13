import React from 'react';
import {Pressable, View, Text} from 'react-native';

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
                    ${isToday ? 'bg-black' : ''}
                    ${selectedDate === date ? 'bg-gray-200' : ''}`}
            >
                <Text 
                    className={`text-base
                        ${isToday ? 'text-white font-bold' : ''}
                        ${isPreviousMonth ? 'text-gray-300' : 'text-gray-500'}
                        ${!isToday && !isPreviousMonth && selectedDate === date ? 'font-semibold' : ''}`}
                >
                    {date}
                </Text>
                {hasSchedule && (
                    <View className="absolute bottom-0 w-1.5 h-1.5 bg-custom rounded-full" />
                )}
            </View>
            )}
        </Pressable>
    );
}

export default DateBox;