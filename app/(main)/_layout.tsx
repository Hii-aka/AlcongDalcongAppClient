import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

export default function MainLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { 
                        backgroundColor: COLORS.background 
                    },
                    animation: 'slide_from_right',
                    animationDuration: 200,
                    presentation: 'card',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            >
                <Stack.Screen 
                    name="(tabs)" 
                    options={{ 
                        animation: 'fade',
                        gestureEnabled: false,
                    }} 
                />
                <Stack.Screen 
                    name="couple-requests" 
                    options={{
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    }}
                />
            </Stack>
        </>
    );
} 