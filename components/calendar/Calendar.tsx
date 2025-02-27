import React, { useCallback } from 'react';
import { View, Text, Pressable, Dimensions, Image } from 'react-native';
import { isSameAsCurrentDate, MonthYear } from '@/utils/date';
import DayOfWeeks from './DayOfWeeks';
import { Ionicons } from '@expo/vector-icons';
import DateBox from './DateBox';
import useModal from '@/hooks/useModal';
import YearSelector from './YearSelector';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
interface CalendarProps<T> {
    monthYear: MonthYear;
    selectedDate: number;
    schedules: Record<number, T[]>;
    onPressDate: (date: number) => void;
    onChangeMonth: (increment: number) => void;
    moveToToday: () => void;
    partnerName?: string; // 연인 이름
    daysCount?: number; // 사귄 일수
}

function Calendar<T>({
    monthYear,
    selectedDate,
    schedules,
    onPressDate,
    onChangeMonth,
    moveToToday,
    partnerName = '',
    daysCount = 0,
}: CalendarProps<T>) {     
    const {year, month, firstDayOfMonth, lastDate} = monthYear;
    const yearSelector = useModal();

    const handleChangeYear = (selectedYear: number) => {
        onChangeMonth((selectedYear - year) * 12);
        yearSelector.hide();
    }

    // 화면 너비에서 패딩을 제외한 실제 캘린더 너비 계산
    const screenWidth = Dimensions.get('window').width;
    const calendarPadding = 48;
    const contentPadding = 32;
    const calendarWidth = screenWidth - calendarPadding - contentPadding;
    const dateBoxWidth = Math.floor(calendarWidth / 7);

    // 달력 데이터 생성
    const calendarDays = Array.from({ length: 42 }, (_, index) => {
        const date = index - firstDayOfMonth + 1;
        return {
            id: index,
            date: date > 0 && date <= lastDate ? date : 0
        };
    });

    const weeks = Array.from({ length: 6 }, (_, weekIndex) => 
        calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7)
    );

    return (
        <View className="flex-1 bg-white">
            <LinearGradient
                colors={[COLORS.backgroundAlt, COLORS.background] as readonly [string, string]}
                className="pt-4"
            >
                <View className="px-6 pb-4">
                    {/* 커플 정보 섹션 */}
                    <Animated.View 
                        entering={FadeInDown.duration(600)}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-pink-100 mb-6"
                    >
                        <LinearGradient
                            colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
                            className="px-4 py-2"
                        >
                            <Text className="text-white font-medium text-center">
                                우리의 캘린더
                            </Text>
                        </LinearGradient>
                        <View className="p-4">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <View className="relative">
                                        <Image
                                            source={{ uri: 'https://picsum.photos/100' }}
                                            className="w-14 h-14 rounded-full border-2 border-white"
                                            style={SHADOWS.small}
                                        />
                                        <View className="absolute -right-1 -bottom-1 bg-white rounded-full p-1">
                                            <Ionicons name="heart" size={14} color={COLORS.love} />
                                        </View>
                                    </View>
                                    <View className="mx-2">
                                        <Ionicons name="heart" size={24} color={COLORS.love} />
                                    </View>
                                    <View className="relative">
                                        <Image
                                            source={{ uri: 'https://picsum.photos/101' }}
                                            className="w-14 h-14 rounded-full border-2 border-white"
                                            style={SHADOWS.small}
                                        />
                                        <View className="absolute -right-1 -bottom-1 bg-white rounded-full p-1">
                                            <Ionicons name="heart" size={14} color={COLORS.love} />
                                        </View>
                                    </View>
                                </View>
                                <View className="items-end">
                                    <Text className="text-base font-medium text-gray-600">
                                        함께한 지
                                    </Text>
                                    <Text className="text-2xl font-bold text-pink-500">
                                        {daysCount}일
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* 달력 헤더 */}
                    <Animated.View 
                        entering={FadeInDown.delay(200).duration(600)}
                        className="flex-row justify-between items-center mb-6"
                    >
                        <Pressable 
                            className="w-12 h-12 items-center justify-center rounded-full bg-white"
                            onPress={() => onChangeMonth(-1)}
                            style={SHADOWS.small}
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
                            <View className="absolute -right-1 -top-1 bg-white rounded-full p-1">
                                <Ionicons name="heart" size={14} color={COLORS.love} />
                            </View>
                        </Pressable>

                        <Pressable 
                            className="w-12 h-12 items-center justify-center rounded-full bg-white"
                            onPress={() => onChangeMonth(1)}
                            style={SHADOWS.small}
                        >
                            <Ionicons name="chevron-forward" size={24} color={COLORS.love} />
                        </Pressable>
                    </Animated.View>

                    {/* 달력 본체 */}
                    <Animated.View 
                        entering={FadeInDown.delay(400).duration(600)}
                        className="bg-white rounded-3xl p-4 shadow-sm border border-pink-100"
                    >
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
                    </Animated.View>

                    {/* 하단 버튼 */}
                    <Animated.View 
                        entering={FadeInDown.delay(600).duration(600)}
                        className="flex-row justify-center mt-6 space-x-4"
                    >
                        <Pressable
                            className="flex-row items-center justify-center py-3 px-6 
                                rounded-full bg-white"
                            style={SHADOWS.small}
                            onPress={moveToToday}
                        >
                            <Ionicons name="today" size={20} color={COLORS.love} />
                            <Text className="text-base font-bold text-gray-800 ml-2">
                                오늘로 이동
                            </Text>
                            <View className="absolute -right-1 -top-1 bg-white rounded-full p-1">
                                <Ionicons name="heart" size={14} color={COLORS.love} />
                            </View>
                        </Pressable>

                        <Pressable
                            className="overflow-hidden rounded-full"
                            style={SHADOWS.small}
                            onPress={() => router.push('/calendar/post' as any)}
                        >
                            <LinearGradient
                                colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
                                className="flex-row items-center justify-center py-3 px-6"
                            >
                                <Ionicons name="add" size={20} color="white" />
                                <Text className="text-base font-bold text-white ml-2">
                                    새로운 데이트
                                </Text>
                            </LinearGradient>
                        </Pressable>
                    </Animated.View>
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