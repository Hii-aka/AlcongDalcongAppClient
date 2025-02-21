import React from 'react';
import { Stack } from 'expo-router';

export default function CoupleLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: '커플 연결 관리',
        headerShown: true,
        headerTitleStyle: {
          fontWeight: '600',
        },
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="requests"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 