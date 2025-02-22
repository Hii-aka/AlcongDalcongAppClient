import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../../constants/theme';
import { Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { usePathname } from 'expo-router';

export default function TabLayout() {
    const pathname = usePathname();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 20 : 16,
                    left: 16,
                    right: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 30,
                    height: Platform.OS === 'ios' ? 65 : 60,
                    ...SHADOWS.medium,
                    borderTopWidth: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                },
                tabBarBackground: () => (
                    <BlurView
                        tint="light"
                        intensity={30}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 30,
                        }}
                    />
                ),
                tabBarActiveTintColor: COLORS.love,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: -4,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="diary"
                options={{
                    title: '다이어리',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View className="items-center justify-center">
                            <Ionicons 
                                name={focused ? "book" : "book-outline"} 
                                size={size} 
                                color={color} 
                            />
                            {focused && (
                                <View 
                                    className="w-1 h-1 rounded-full bg-pink-500 mt-1"
                                />
                            )}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: '캘린더',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View className="items-center justify-center">
                            <Ionicons 
                                name={focused ? "calendar" : "calendar-outline"} 
                                size={size} 
                                color={color} 
                            />
                            {focused && (
                                <View 
                                    className="w-1 h-1 rounded-full bg-pink-500 mt-1"
                                />
                            )}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: '채팅',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View className="items-center justify-center">
                            <Ionicons 
                                name={focused ? "chatbubbles" : "chatbubbles-outline"} 
                                size={size} 
                                color={color} 
                            />
                            {focused && (
                                <View 
                                    className="w-1 h-1 rounded-full bg-pink-500 mt-1"
                                />
                            )}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: '프로필',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View className="items-center justify-center">
                            <Ionicons 
                                name={focused ? "heart" : "heart-outline"} 
                                size={size} 
                                color={color} 
                            />
                            {focused && (
                                <View 
                                    className="w-1 h-1 rounded-full bg-pink-500 mt-1"
                                />
                            )}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
} 