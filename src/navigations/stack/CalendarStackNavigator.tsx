import React from 'react';
import {StyleSheet, View} from 'react-native';
import { calendarNavigations } from '@/constants';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import CalendarPostScreen from '@/screens/calendar/CalendarPostScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type CalendarStackParamList = {
    [calendarNavigations.CALENDAR_HOME]: undefined;
    [calendarNavigations.CALENDAR_POST]: undefined;
}

const Stack = createNativeStackNavigator<CalendarStackParamList>();

function CalendarStackNavigator() {
    console.log('CalendarStackNavigator',calendarNavigations.CALENDAR_POST);
    
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name={calendarNavigations.CALENDAR_HOME} 
            component={CalendarHomeScreen} 
            options={{
                title: '캘린더',
            }}
        />
        <Stack.Screen 
            name={calendarNavigations.CALENDAR_POST} 
            component={CalendarPostScreen} 
            options={{
                title: '캘린더 작성',
            }}
        />
    </Stack.Navigator>
  )
}


export default CalendarStackNavigator;