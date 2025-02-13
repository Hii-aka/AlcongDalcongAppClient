import { Stack, router } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DiaryLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#000000',
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen name="index" 
        options={{
          title: '일기',
          headerRight: () => (
            <Pressable onPress={() => router.push('/diary/post')}>
              <Ionicons name="add" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="post" 
        options={{
          title: '일기 작성',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
}
