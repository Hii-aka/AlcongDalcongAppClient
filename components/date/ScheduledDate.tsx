import { router } from 'expo-router';
import React from 'react';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ScheduledDateProps {

}

function ScheduledDate({}: ScheduledDateProps) {
  return (
    <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20
            }}
            >   
    <View className="space-y-3">
      {[
        { date: '2월 14일', event: '강남 cgv 영화보기', time: '19:00' },
        { date: '2월 17일', event: '이태원 맛집투어', time: '18:30' },
      ].map(({ date, event, time }) => (
        <Pressable 
          key={date} 
          className="flex-row items-center p-4 bg-gray-50 rounded-xl"
          onPress={() => router.push('/calendar/post')}
        >
          <View className="w-2 h-12 bg-custom rounded-full mr-4" />
          <View className="flex-1">
            <Text className="text-base font-semibold">{date}</Text>
            <Text className="text-sm text-gray-600">{time}</Text>
            <Text className="text-sm text-gray-800 mt-1">{event}</Text>
          </View>
          <Pressable 
            className="p-2"
            onPress={(e) => {
              e.stopPropagation();
              router.push('/calendar/post');
            }}
          >
            <Feather name="edit" size={24} color="black" />
          </Pressable>
        </Pressable>
      ))}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({});

export default ScheduledDate;