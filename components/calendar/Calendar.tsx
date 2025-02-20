import React, { useEffect } from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, FlatList} from 'react-native';
import { isSameAsCurrentDate, MonthYear } from '@/utils/date';
import DayOfWeeks from './DayOfWeeks';
import { Ionicons } from '@expo/vector-icons';
import DateBox from './DateBox';
import useModal from '@/hooks/useModal';
import YearSelector from './YearSelector';
import { FontAwesome5 } from '@expo/vector-icons';

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
        <Pressable 
          className="w-10 h-10 items-center justify-center rounded-full active:bg-pink-50"
          onPress={() => onChangeMonth(-1)}
        >
          <Ionicons name="chevron-back" size={24} color="#EC4899" />   
        </Pressable>
        <Pressable 
          className="flex-row items-center space-x-2 px-4 py-2 rounded-full bg-pink-50"
          onPress={yearSelector.show}
        >
          <FontAwesome5 name="heart" size={16} color="#EC4899" />
          <Text className="text-xl font-bold text-gray-800">
            {year}년 {month}월
          </Text>
        </Pressable>
        <Pressable 
          className="w-10 h-10 items-center justify-center rounded-full active:bg-pink-50"
          onPress={() => onChangeMonth(1)}
        >
          <Ionicons name="chevron-forward" size={24} color="#EC4899" />
        </Pressable>
      </View> 

      <View className='bg-white rounded-2xl shadow-sm p-4 mb-6 border border-pink-100'>
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
        
        <Pressable
          className="mt-4 flex-row items-center justify-center space-x-2 py-2 px-4 rounded-full bg-pink-50 self-center"
          onPress={moveToToday}
        >
          <View className="flex-row items-center">
            <FontAwesome5 name="calendar-alt" size={16} color="#EC4899" />
            <FontAwesome5 
              name="heart" 
              size={12} 
              color="#EC4899" 
              style={{ marginLeft: -6, marginTop: -8 }} 
            />
          </View>
          <Text className="text-pink-500 font-medium">오늘의 데이트</Text>
        </Pressable>
      </View>
    </View>

    <YearSelector
      isVisible={yearSelector.isVisible}
      currentyear={year}
      onChangeYear={handleChangeYear}
      hide={yearSelector.hide}
    />
   </View>
  )
}

const styles = StyleSheet.create({});

export default Calendar;