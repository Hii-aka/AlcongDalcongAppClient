import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#6366f1',
            }}
        >
            <Tabs.Screen
                name="diary"
                options={{
                    title: '일기',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="book-outline" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: '캘린더',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="calendar-outline" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: '채팅',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="chatbubble-outline" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: '프로필',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person-outline" size={size} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
} 