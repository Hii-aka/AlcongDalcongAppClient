import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { COLORS } from '@/constants/theme';

const queryClient = new QueryClient();

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
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}