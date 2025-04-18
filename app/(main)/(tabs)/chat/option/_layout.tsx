import { Stack } from 'expo-router';

export default function ChatOptionLayout() {
    return (
        <Stack screenOptions={{
            headerTintColor: '#000000',
            contentStyle: {
                backgroundColor: '#FFFFFF',
            },
            headerShown: false,
        }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
