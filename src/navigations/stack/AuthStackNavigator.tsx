import React from 'react';
import {StyleSheet, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthHomeScreen } from '@/screens/auth/AuthHomeScreen';
import { authNavigations } from '@/constants';
import SignupScreen from '@/screens/auth/SignupScreen';
export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.SIGNUP]: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name={authNavigations.AUTH_HOME} 
        component={AuthHomeScreen} 
        options={{
            headerShown: false,
        }}
        />
        <Stack.Screen 
        name={authNavigations.SIGNUP} 
        component={SignupScreen} 
        options={{
            headerShown: false,
        }}
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;