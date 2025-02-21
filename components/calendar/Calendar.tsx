import React from 'react';
import { View, Text, Pressable, FlatList, Animated } from 'react-native';
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
                            <FlatList
                                scrollEnabled={false}
                                data={Array.from({length: lastDate + firstDayOfMonth}, (_, index) => ({
                                    id: index,
                                    date: index - firstDayOfMonth + 1,
                                }))}
                                renderItem={({item}) => (
                                    <DateBox
                                        date={item.date}
                                        isToday={isSameAsCurrentDate(year, month, item.date)}
                                        hasSchedule={schedules[item.date]?.length > 0}
                                        selectedDate={selectedDate}
                                        onPressDate={onPressDate}
                                    />
                                )}
                                keyExtractor={item => String(item.id)}
                                numColumns={7}
                            />
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