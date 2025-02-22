import { Stack, router } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarLayout() {
  return (
    <Stack screenOptions={{
      headerTintColor: '#000000',
      contentStyle: {
        backgroundColor: '#FFFFFF',
      },
    }}>
      <Stack.Screen name="index"
        options={{
          title: '캘린더',
          headerShown: false,
        }}
      />
      <Stack.Screen name="post" 
        options={{
          title: '일정 추가',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
