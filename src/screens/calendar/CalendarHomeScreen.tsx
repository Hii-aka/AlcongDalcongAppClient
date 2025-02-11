import React, {useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Pressable, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AddCalendarHeaderRight from '@/components/calendar/AddCalendarHeaderRight';
import { CalendarStackParamList } from '@/navigations/stack/CalendarStackNavigator';
import { calendarNavigations } from '@/constants';
import { StackScreenProps } from '@react-navigation/stack';

type CalendarHomeScreenProps = StackScreenProps<CalendarStackParamList, typeof calendarNavigations.CALENDAR_HOME>;


function CalendarHomeScreen({ navigation }: CalendarHomeScreenProps) {

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
          <View key={day} className="w-[14.28%] aspect-square p-1">
            <View className={`flex-1 items-center justify-center rounded-full
              ${isToday ? 'bg-black' : ''}`}>
              <Text className={`text-base ${isToday ? 'text-white font-bold' : 'text-gray-800'}`}>
                {day}
              </Text>
              {hasEvent && (
                <View className="absolute bottom-0 w-1.5 h-1.5 bg-custom rounded-full" />
              )}
            </View>
          </View>
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
        <View key={date} className="flex-row items-center p-4 bg-gray-50 rounded-xl">
          <View className="w-2 h-12 bg-custom rounded-full mr-4" />
          <View className="flex-1">
            <Text className="text-base font-semibold">{date}</Text>
            <Text className="text-sm text-gray-600">{time}</Text>
            <Text className="text-sm text-gray-800 mt-1">{event}</Text>
          </View>
          <Pressable className="p-2">
            <FontAwesome name="edit" size={20} color="#666" />
          </Pressable>
        </View>
      ))}
    </View>
  );

  const handleSubmit = () => {
    navigation.navigate(calendarNavigations.CALENDAR_POST);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        AddCalendarHeaderRight(handleSubmit)
      ),
    });
  }, [navigation]); 

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          <Text className="text-lg font-bold mb-4">예정된 데이트</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default CalendarHomeScreen;