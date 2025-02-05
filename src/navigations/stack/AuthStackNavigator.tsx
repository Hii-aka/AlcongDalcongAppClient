import React from 'react';
import {StyleSheet, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthHomeScreen } from '@/screens/auth/AuthHomeScreen';
import { authNavigations } from '@/constants';

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name={authNavigations.AUTH_HOME} 
        component={AuthHomeScreen} 
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;