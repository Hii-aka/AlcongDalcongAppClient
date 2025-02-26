import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import useAuth from "../../../../hooks/queries/useAuth";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileWithCouple, ApiResponse } from "@/types";
import useGetCoupleRequestPending from "../../../../hooks/queries/useGetCoupleRequestPending";
import useGetCoupleRequestAccepted from "../../../../hooks/queries/useGetCoupleRequestAccepted";
import { getDaysDifference, formatDate } from "@/utils";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import AuthRoute from "@/components/common/AuthRoute";
export default function ProfileHome() {
    const router = useRouter();
    const { logoutMutation } = useAuth();
    const insets = useSafeAreaInsets();
    const { getMeQuery } = useAuth();

    const { data: {user, partner} } = getMeQuery as { data: ProfileWithCouple};
    const { data: coupleRequestPending } = useGetCoupleRequestPending();
    const { data: coupleRequestAccepted } = useGetCoupleRequestAccepted();

    const handleLogout = () => {
        Alert.alert(
            "로그아웃",
            "정말 로그아웃 하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                { 
                    text: "로그아웃", 
                    style: "destructive",
                    onPress: () => logoutMutation.mutate(null) 
                }
            ]
        );
    };

    return (
        <AuthRoute>
            <ScrollView 
                className="flex-1 bg-white"
                contentContainerStyle={{
                paddingBottom: insets.bottom + 120
            }}
        >
            <LinearGradient
                colors={[COLORS.backgroundAlt, COLORS.background] as readonly [string, string]}
                className="flex-1"
            >
                {/* 헤더 섹션 */}
                <View className="pb-6">
                    <LinearGradient
                        colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
                        className="pt-12 pb-8 px-6 rounded-b-[40px]"
                        style={SHADOWS.medium}
                    >
                        <Animated.View 
                            entering={FadeInDown.duration(600)}
                            className="items-center"
                        >
                            <View className="relative">
                                <View className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                    <Image 
                                        source={
                                            user?.profileImage 
                                                ? { uri: user.profileImage }
                                                : require('@/assets/images/default-profile.png')
                                        }
                                        className="w-full h-full"
                                    />
                                </View>
                                <TouchableOpacity 
                                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg"
                                    style={SHADOWS.small}
                                    onPress={() => router.push("/profile/edit")}
                                >
                                    <Ionicons name="camera" size={20} color={COLORS.love} />
                                </TouchableOpacity>
                            </View>
                            <Text className="text-2xl font-bold mt-4 text-white">{user?.nickname}</Text>
                            <View className="flex-row items-center mt-2 bg-white/20 px-4 py-2 rounded-full">
                                <FontAwesome5 name="heart" size={12} color="white" />
                                <Text className="text-white ml-2 font-medium">
                                    {coupleRequestAccepted 
                                        ? `연인과 함께한지 ${getDaysDifference(coupleRequestAccepted.firstMetDate)}일` 
                                        : '연인을 등록해주세요.'}
                                </Text>
                            </View>
                        </Animated.View>
                    </LinearGradient>

                    {/* 정보 섹션 */}
                    <View className="px-6 -mt-6">
                        {/* 커플 정보 카드 */}
                        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                            <InfoSection 
                                title="우리의 기록" 
                                icon="heart"
                                iconColor={COLORS.love}
                                items={[
                                    { 
                                        label: "처음 만난 날", 
                                        value: coupleRequestAccepted?.firstMetDate ? formatDate(coupleRequestAccepted.firstMetDate) : '처음 만난 날을 등록해주세요.', 
                                        icon: "calendar-alt" 
                                    },
                                    { label: "함께한 일기", value: "123개", icon: "book" },
                                    { label: "공유한 사진", value: "486장", icon: "images" },
                                ]}
                            />
                        </Animated.View>

                        {/* 기본 정보 카드 */}
                        <Animated.View entering={FadeInDown.delay(400).duration(600)} className="mt-6">
                            <InfoSection 
                                title="내 정보" 
                                icon="user"
                                iconColor={COLORS.love}
                                items={[
                                    { label: "이메일", value: user?.email || '', icon: "envelope" },
                                    { label: "연인 코드", value: "LOVE123", icon: "key" },
                                ]}
                            />
                        </Animated.View>

                        {/* 설정 버튼들 */}
                        <Animated.View 
                            entering={FadeInDown.delay(600).duration(600)}
                            className="space-y-3 mt-6"
                        >
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
                        </Animated.View>

                        {/* 구분선 */}
                        <View className="h-[1px] bg-pink-100 my-6" />

                        {/* 로그아웃 버튼 */}
                        <Animated.View entering={FadeInDown.delay(800).duration(600)}>
                            <ActionButton 
                                label="로그아웃"
                                icon="sign-out-alt"
                                onPress={handleLogout}
                                variant="danger"
                            />
                        </Animated.View>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
        </AuthRoute>
    );
}

function InfoSection({ title, icon, iconColor = COLORS.love, items }: { 
    title: string; 
    icon: string;
    iconColor?: string;
    items: Array<{ label: string; value: string; icon: string; }> 
}) {
    return (
        <View 
            className="bg-white rounded-3xl overflow-hidden border border-pink-100"
            style={SHADOWS.small}
        >
            <LinearGradient
                colors={[COLORS.backgroundAlt, COLORS.background] as readonly [string, string]}
                className="px-6 py-4 border-b border-pink-50"
            >
                <View className="flex-row items-center">
                    <FontAwesome5 name={icon} size={16} color={iconColor} />
                    <Text className="text-gray-800 font-bold text-lg ml-2">{title}</Text>
                </View>
            </LinearGradient>
            <View className="p-6 space-y-4">
                {items.map((item, index) => (
                    <View key={index} className="flex-row items-center">
                        <View className="w-8 h-8 rounded-full bg-pink-50 items-center justify-center">
                            <FontAwesome5 name={item.icon} size={14} color={COLORS.love} />
                        </View>
                        <Text className="text-gray-600 ml-3 flex-1 text-base">{item.label}</Text>
                        <Text className="text-gray-800 font-semibold text-base">{item.value}</Text>
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
                    container: "bg-white",
                    gradient: [COLORS.love, COLORS.primary] as readonly [string, string],
                    text: "text-white",
                    icon: "white"
                };
            case 'secondary':
                return {
                    container: "bg-white",
                    gradient: [COLORS.backgroundAlt, COLORS.background] as readonly [string, string],
                    text: "text-gray-800",
                    icon: COLORS.love
                };
            case 'danger':
                return {
                    container: "bg-white",
                    gradient: ['#FEE2E2', '#FEF2F2'] as readonly [string, string],
                    text: "text-red-500",
                    icon: "#EF4444"
                };
        }
    };

    const styles = getStyles();
    
    return (
        <TouchableOpacity 
            className="overflow-hidden rounded-2xl"
            style={SHADOWS.small}
            onPress={onPress}
        >
            <LinearGradient
                colors={styles.gradient}
                className="py-4 px-6"
            >
                <View className="flex-row items-center justify-center space-x-2">
                    <FontAwesome5 name={icon} size={16} color={styles.icon} />
                    <Text className={`font-bold text-base ${styles.text}`}>{label}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}
