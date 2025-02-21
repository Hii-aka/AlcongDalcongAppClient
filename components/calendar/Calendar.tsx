import React, { useCallback } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { isSameAsCurrentDate, MonthYear } from '@/utils/date';
import DayOfWeeks from './DayOfWeeks';
import { Ionicons } from '@expo/vector-icons';
import DateBox from './DateBox';
import useModal from '@/hooks/useModal';
import YearSelector from './YearSelector';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';

interface CalendarProps<T> {
    monthYear: MonthYear;
    selectedDate: number;
    schedules: Record<number, T[]>;
    onPressDate: (date: number) => void;
    onChangeMonth: (increment: number) => void;
    moveToToday: () => void;
}

function Calendar<T>({
    monthYear,
    selectedDate,
    schedules,
    onPressDate,
    onChangeMonth,
    moveToToday,
}: CalendarProps<T>) {     
    const {year, month, firstDayOfMonth, lastDate} = monthYear;
    const yearSelector = useModal();

    const handleChangeYear = (selectedYear: number) => {
        onChangeMonth((selectedYear - year) * 12);
        yearSelector.hide();
    }

    // 화면 너비에서 패딩을 제외한 실제 캘린더 너비 계산
    const screenWidth = Dimensions.get('window').width;
    const calendarPadding = 48; // 좌우 패딩 24 * 2
    const contentPadding = 32; // 캘린더 내부 패딩 16 * 2
    const calendarWidth = screenWidth - calendarPadding - contentPadding;
    const dateBoxWidth = Math.floor(calendarWidth / 7); // 7일로 나누어 각 날짜 박스의 너비 계산

    // 달력 데이터 생성
    const calendarDays = Array.from({ length: 42 }, (_, index) => {
        const date = index - firstDayOfMonth + 1;
        return {
            id: index,
            date: date > 0 && date <= lastDate ? date : 0
        };
    });

    // 주 단위로 데이터 분할
    const weeks = Array.from({ length: 6 }, (_, weekIndex) => 
        calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7)
    );

    return (
        <View className="flex-1 bg-white">
            <LinearGradient
                colors={[COLORS.backgroundAlt, COLORS.background]}
                className="pt-4"
            >
                <View className="px-6 pb-4">
                    <View className="flex-row justify-between items-center mb-6">
                        <Pressable 
                            className="w-12 h-12 items-center justify-center rounded-full active:bg-pink-50"
                            onPress={() => onChangeMonth(-1)}
                            style={({ pressed }) => [
                                pressed && { backgroundColor: COLORS.backgroundAlt },
                                SHADOWS.small
                            ]}
                        >
                            <Ionicons name="chevron-back" size={24} color={COLORS.love} />   
                        </Pressable>

                        <Pressable 
                            className="flex-row items-center px-6 py-3 rounded-full bg-white"
                            onPress={yearSelector.show}
                            style={SHADOWS.small}
                        >
                            <Ionicons name="calendar" size={20} color={COLORS.love} />
                            <Text className="text-xl font-bold text-gray-800 ml-2">
                                {year}년 {month}월
                            </Text>
                            <View className="absolute -right-1 -top-1">
                                <Ionicons name="heart" size={16} color={COLORS.love} />
                            </View>
                        </Pressable>

                        <Pressable 
                            className="w-12 h-12 items-center justify-center rounded-full active:bg-pink-50"
                            onPress={() => onChangeMonth(1)}
                            style={({ pressed }) => [
                                pressed && { backgroundColor: COLORS.backgroundAlt },
                                SHADOWS.small
                            ]}
                        >
                            <Ionicons name="chevron-forward" size={24} color={COLORS.love} />
                        </Pressable>
                    </View>

                    <View className="bg-white rounded-3xl p-4 shadow-sm border border-pink-100">
                        <DayOfWeeks />
                        <View>
                            {weeks.map((week, weekIndex) => (
                                <View key={weekIndex} className="flex-row justify-between">
                                    {week.map((day) => (
                                        <DateBox
                                            key={day.id}
                                            date={day.date}
                                            isToday={isSameAsCurrentDate(year, month, day.date)}
                                            hasSchedule={schedules[day.date]?.length > 0}
                                            selectedDate={selectedDate}
                                            onPressDate={onPressDate}
                                            width={dateBoxWidth}
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>

                    <Pressable
                        className="mt-6 flex-row items-center justify-center space-x-2 py-3 px-6 
                            rounded-full bg-white self-center"
                        style={SHADOWS.small}
                        onPress={moveToToday}
                    >
                        <Ionicons name="today" size={20} color={COLORS.love} />
                        <Text className="text-base font-semibold text-gray-800">
                            오늘로 이동
                        </Text>
                        <View className="absolute -right-1 -top-1">
                            <Ionicons name="heart" size={16} color={COLORS.love} />
                        </View>
                    </Pressable>
                </View>
            </LinearGradient>

            <YearSelector
                isVisible={yearSelector.isVisible}
                currentyear={year}
                onChangeYear={handleChangeYear}
                hide={yearSelector.hide}
            />
        </View>
    );
}

export default Calendar;