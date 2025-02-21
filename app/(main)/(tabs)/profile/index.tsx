import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import useAuth from "../../../../hooks/queries/useAuth";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Profile } from "@/types";

export default function ProfileHome() {
    const router = useRouter();
    const { logoutMutation } = useAuth();
    const insets = useSafeAreaInsets();
    const { getMeQuery } = useAuth();

    const { data: me } = getMeQuery as { data: Profile };

    if (!me) {
        router.replace("/");
    }

    console.log(me);

    const handleLogout = () => {
        Alert.alert(
            "로그아웃",
            "정말 로그아웃 하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                { 
                    text: "로그아웃", 
                    style: "destructive",
                    onPress: () => logoutMutation.mutate({}) 
                }
            ]
        );
    };

    return (
        <ScrollView 
            className="flex-1 bg-pink-50/30"
            contentContainerStyle={{
                paddingBottom: insets.bottom + 120
            }}
        >
            {/* 헤더 섹션 */}
            <View className="bg-white pb-6 shadow-sm">
                <View className="items-center pt-12 pb-6">
                    <View className="relative">
                        <View className="w-24 h-24 rounded-full border-4 border-pink-100 shadow-md overflow-hidden">
                            <Image 
                                source={
                                    me?.profileImage 
                                        ? { uri: me.profileImage }
                                        : require('@/assets/images/default-profile.png')
                                }
                                className="w-full h-full"
                            />
                        </View>
                        <TouchableOpacity 
                            className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full shadow-md"
                            onPress={() => router.push("/profile/edit")}
                        >
                            <Ionicons name="camera" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl font-bold mt-4 text-gray-800">{me.nickname}</Text>
                    <View className="flex-row items-center mt-1">
                        <FontAwesome5 name="heart" size={12} color="#EC4899" />
                        <Text className="text-pink-500 ml-2">연인과 함께한지 365일</Text>
                    </View>
                </View>
            </View>

            {/* 정보 섹션 */}
            <View className="px-4 py-6 space-y-6">
                {/* 커플 정보 카드 */}
                <InfoSection 
                    title="우리의 기록" 
                    icon="heart"
                    iconColor="#EC4899"
                    items={[
                        { label: "처음 만난 날", value: "2023.01.01", icon: "calendar-alt" },
                        { label: "함께한 일기", value: "123개", icon: "book" },
                        { label: "공유한 사진", value: "486장", icon: "images" },
                    ]}
                />

                {/* 기본 정보 카드 */}
                <InfoSection 
                    title="내 정보" 
                    icon="user"
                    iconColor="#EC4899"
                    items={[
                        { label: "이메일", value: "user@example.com", icon: "envelope" },
                        { label: "연인 코드", value: "LOVE123", icon: "key" },
                    ]}
                />

                {/* 설정 버튼들 */}
                <View className="space-y-3">
                    <ActionButton 
                        label="프로필 수정"
                        icon="edit"
                        onPress={() => router.push("/profile/edit")}
                    />
                    <ActionButton 
                        label="알림 설정"
                        icon="bell"
                        onPress={() => router.push("/profile/notifications")}
                        variant="secondary"
                    />
                    <ActionButton 
                        label="커플 연결 관리"
                        icon="heart"
                        onPress={() => router.push("/profile/couple")}
                        variant="secondary"
                    />
                </View>

                {/* 구분선 */}
                <View className="h-[1px] bg-pink-100 my-4" />

                {/* 로그아웃 버튼 */}
                <ActionButton 
                    label="로그아웃"
                    icon="sign-out-alt"
                    onPress={handleLogout}
                    variant="danger"
                />
            </View>
        </ScrollView>
    );
}

function InfoSection({ title, icon, iconColor = "#EC4899", items }: { 
    title: string; 
    icon: string;
    iconColor?: string;
    items: Array<{ label: string; value: string; icon: string; }> 
}) {
    return (
        <View className="bg-white rounded-2xl shadow-sm overflow-hidden border border-pink-100">
            <View className="flex-row items-center p-4 border-b border-pink-50">
                <FontAwesome5 name={icon} size={16} color={iconColor} />
                <Text className="text-gray-800 font-semibold ml-2">{title}</Text>
            </View>
            <View className="p-4 space-y-4">
                {items.map((item, index) => (
                    <View key={index} className="flex-row items-center">
                        <FontAwesome5 name={item.icon} size={14} color="#EC4899" />
                        <Text className="text-gray-600 ml-3 flex-1">{item.label}</Text>
                        <Text className="text-gray-800 font-medium">{item.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

function ActionButton({ 
    label, 
    icon, 
    onPress, 
    variant = 'primary' 
}: { 
    label: string; 
    icon: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
}) {
    const getStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    button: "bg-pink-500",
                    text: "text-white",
                    icon: "white"
                };
            case 'secondary':
                return {
                    button: "bg-pink-50",
                    text: "text-pink-600",
                    icon: "#EC4899"
                };
            case 'danger':
                return {
                    button: "bg-white border border-red-400",
                    text: "text-red-500",
                    icon: "#F87171"
                };
        }
    };

    const styles = getStyles();
    
    return (
        <TouchableOpacity 
            className={`w-full py-4 rounded-xl flex-row items-center justify-center space-x-2 ${styles.button}`}
            onPress={onPress}
        >
            <FontAwesome5 name={icon} size={16} color={styles.icon} />
            <Text className={`font-semibold ${styles.text}`}>{label}</Text>
        </TouchableOpacity>
    );
}
