import React from 'react';
import {StyleSheet, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChattingHomeScreen from '@/screens/chatting/ChattingHomeScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';    
import { mainTabNavigations } from '@/constants';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import CalendarStackNavigator from '@/navigations/stack/CalendarStackNavigator';
import DiaryStackNavigator from '@/navigations/stack/DiaryStackNavigator';

export type MainTabParamList = {
    [mainTabNavigations.DIARY_HOME]: undefined;
    [mainTabNavigations.CALENDAR_HOME]: undefined;
    [mainTabNavigations.CHATTING_HOME]: undefined;
    [mainTabNavigations.SETTING_HOME]: undefined;
}

const Tab = createBottomTabNavigator<MainTabParamList>();

function tabBarIcons(
    route: RouteProp<MainTabParamList>,
    focused: boolean,
) {
    let color = '';
    let iconName = '';
    switch (route.name) {
        case mainTabNavigations.DIARY_HOME:
            color = focused ? 'black' : 'gray';
            iconName = 'home';
            break;
        case mainTabNavigations.CALENDAR_HOME:
            color = focused ? 'black' : 'gray';
            iconName = 'calendar';
            break;
        case mainTabNavigations.CHATTING_HOME:
            color = focused ? 'black' : 'gray';
            iconName = 'comment';
            break;
        case mainTabNavigations.SETTING_HOME:
            color = focused ? 'black' : 'gray';
            iconName = 'user';
            break;
    }
    return <FontAwesome name={iconName as keyof typeof FontAwesome.glyphMap} size={25} color={color} />;
}

function MainTabNavigation() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            headerTitelStyle:{
                fontSize: 15,
            },
            tabBarActiveTintColor: 'black',
            tabBarStyle: { 
                backgroundColor: 'white',
                borderTopColor: 'gray',
                borderTopWidth: StyleSheet.hairlineWidth,
            },
            tabBarIcon: ({ focused }) => tabBarIcons(route, focused),
        })}
    >
      <Tab.Screen 
        name={mainTabNavigations.DIARY_HOME} 
        component={DiaryStackNavigator} 
        options={{
            headerTitle: '',
            headerShown: false,
        }}
      />
      <Tab.Screen 
        name={mainTabNavigations.CALENDAR_HOME} 
        component={CalendarStackNavigator} 
        options={{
            headerTitle: '데이트 캘린더',
            headerShown: false,
        }}
      />
      <Tab.Screen name={mainTabNavigations.CHATTING_HOME} component={ChattingHomeScreen} />
      <Tab.Screen name={mainTabNavigations.SETTING_HOME} component={SettingHomeScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MainTabNavigation;