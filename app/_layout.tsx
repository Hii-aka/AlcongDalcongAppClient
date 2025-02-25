import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { COLORS } from '@/constants/theme';
import queryClient from '@/api/queryClient';
import Toast from 'react-native-toast-message';
export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <StatusBar style="dark" backgroundColor={COLORS.background} />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: COLORS.background },
                            animation: 'fade',
                        }}
                    >
                        <Stack.Screen name="(auth)" />
                        <Stack.Screen 
                            name="(main)" 
                            options={{
                                animation: 'slide_from_right',
                            }}
                        />
                    </Stack>
                    <Toast />
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}