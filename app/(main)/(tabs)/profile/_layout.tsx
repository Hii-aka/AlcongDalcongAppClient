import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" 
                options={{
                    title: '프로필',
                    headerShown: false,
                }}
            />
            <Stack.Screen name="couple" 
                options={{
                    title: '커플 연결 관리',
                    headerShown: false,
                }}
            />
            <Stack.Screen name="notifications" 
                options={{
                    title: '알림 설정',
                    headerShown: false,
                }}
            />
            <Stack.Screen name="edit" 
                options={{
                    title: '프로필 수정',
                    headerShown: false,
                }}
            />
        </Stack>
    );
}   