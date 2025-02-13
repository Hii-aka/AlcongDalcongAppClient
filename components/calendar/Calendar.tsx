import React, { useEffect } from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, FlatList} from 'react-native';
import { isSameAsCurrentDate, MonthYear } from '@/utils/date';
import DayOfWeeks from './DayOfWeeks';
import { Ionicons } from '@expo/vector-icons';
import DateBox from './DateBox';
import useModal from '@/hooks/useModal';
import YearSelector from './YearSelector';
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
   <View className='bg-white'>
    <View className='p-4'>
    <View className="flex-row justify-between items-center mb-6">
            <Pressable onPress={() => onChangeMonth(-1)}>
                <Ionicons name="chevron-back" size={24} color="black" />   
            </Pressable>
            <Pressable onPress={yearSelector.show}>
                <Text className="text-2xl font-bold">{year}년 {month}월</Text>
            </Pressable>
          <View className="flex-row space-x-4">
            <Pressable onPress={() => onChangeMonth(1)}>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </Pressable>
          </View>
        </View> 
        <View className='bg-white rounded-2xl shadow-sm p-4 mb-6'>
            <DayOfWeeks />
            <View>
                <FlatList
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
            <YearSelector
            isVisible={yearSelector.isVisible}
            currentyear={year}
            onChangeYear={handleChangeYear}
            hide={yearSelector.hide}
        />
        </View>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({});

export default Calendar;