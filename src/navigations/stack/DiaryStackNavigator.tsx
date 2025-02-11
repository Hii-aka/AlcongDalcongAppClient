import React from 'react';
import {StyleSheet, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { diaryNavigations } from '@/constants';
import DiaryHomeScreen from '@/screens/diary/DiaryHomeScreen';
import DiaryPostScreen from '@/screens/diary/DiaryPostScreen';
export type DiaryStackParamList = {
    [diaryNavigations.DIARY_HOME]: undefined;
}

const Stack = createNativeStackNavigator<DiaryStackParamList>();

const DiaryStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name={diaryNavigations.DIARY_HOME} 
        component={DiaryHomeScreen} 
        options={{
            title: '알콩달콩',
        }}
        />
        <Stack.Screen 
        name={diaryNavigations.DIARY_POST} 
        component={DiaryPostScreen} 
        options={{
            title: '',
        }}
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default DiaryStackNavigator;