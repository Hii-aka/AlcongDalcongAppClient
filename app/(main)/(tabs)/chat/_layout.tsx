import {Stack} from 'expo-router';

export default function ChatLayout() {
    return (
        <Stack screenOptions={{
            headerTintColor: '#000000',
            contentStyle: {
                backgroundColor: '#FFFFFF',
            },
        }}>
            <Stack.Screen name="index" 
                options={{
                    title: '채팅',
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
