import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, TAB_BAR } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { formatDate, getTimeString } from '@/utils';
import { Alert } from 'react-native';
import { useGetDateCalendarById } from '@/hooks/queries/useGetDateCalendarById';

export default function DateDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: dateCalendar, isLoading } = useGetDateCalendarById(id);
  // const deleteDateCalendar = useDeleteDateCalendar();

  const handleDelete = () => {
    Alert.alert(
      "데이트 일정 삭제",
      "정말로 이 데이트 일정을 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            console.log('삭제');
          }
        }
      ]
    );
  };

  if (isLoading || !dateCalendar) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">로딩중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ 
            padding: 16,
            paddingBottom: TAB_BAR.TOTAL_HEIGHT // 탭바 높이 + 여유 공간 더 증가
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* 헤더 */}
          <Animated.View 
            entering={FadeInDown.duration(300)}
            className="flex-row items-center justify-between mb-6"
          >
            <Pressable 
              className="w-10 h-10 items-center justify-center rounded-full bg-white"
              style={SHADOWS.small}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.love} />
            </Pressable>
            <Text className="text-xl font-bold text-gray-800">
              {dateCalendar.title}
            </Text>
            <Pressable 
              className="w-10 h-10 items-center justify-center rounded-full bg-white"
              style={SHADOWS.small}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </Pressable>
          </Animated.View>

          {/* 메인 컨텐츠 */}
          <Animated.View 
            entering={FadeInDown.delay(150).duration(300)}
            className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden"
          >
            <LinearGradient
              colors={[COLORS.love, COLORS.primary]}
              className="px-6 py-3"
            >
              <Text className="text-white font-medium text-center">
                우리의 특별한 날
              </Text>
              <View className="absolute right-4 top-3">
                <Ionicons name="heart" size={20} color="white" />
              </View>
            </LinearGradient>

            <View className="p-6 space-y-6">
              {/* 제목 */}
              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2 flex-row items-center">
                  <Ionicons name="heart" size={16} color={COLORS.love} className="mr-2" />
                  어떤 데이트인가요?
                </Text>
                <View 
                  className="bg-pink-50/30 rounded-2xl p-4"
                  style={SHADOWS.small}
                >
                  <Text className="text-base text-gray-800">
                    {dateCalendar.title}
                  </Text>
                </View>
              </View>

              {/* 날짜/시간 정보 */}
              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  <Ionicons name="calendar" size={16} color={COLORS.love} className="mr-2" />
                  날짜
                </Text>
                <View 
                  className="bg-pink-50/30 rounded-2xl p-4"
                  style={SHADOWS.small}
                >
                  <Text className="text-base text-gray-800">
                    {formatDate((dateCalendar.date))}
                  </Text>
                </View>
              </View>

              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  <Ionicons name="time" size={16} color={COLORS.love} className="mr-2" />
                  시간
                </Text>
                <View 
                  className="bg-pink-50/30 rounded-2xl p-4"
                  style={SHADOWS.small}
                >
                  <Text className="text-base text-gray-800">
                    {getTimeString(dateCalendar.time)}
                  </Text>
                </View>
              </View>

              {/* 장소 정보 */}
              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  <Ionicons name="location" size={16} color={COLORS.love} className="mr-2" />
                  어디서 만날까요?
                </Text>
                <View 
                  className="bg-pink-50/30 rounded-2xl p-4"
                  style={SHADOWS.small}
                >
                  <Text className="text-base text-gray-800">
                    {dateCalendar.location}
                  </Text>
                </View>
              </View>

              {/* 메모 정보 */}
              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  <Ionicons name="document-text" size={16} color={COLORS.love} className="mr-2" />
                  메모하기
                </Text>
                <View 
                  className="bg-pink-50/30 rounded-2xl p-4"
                  style={SHADOWS.small}
                >
                  <Text className="text-base text-gray-800">
                    {dateCalendar.description}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* 수정 버튼 */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(300)}
            className="mt-6 mb-4" // 하단 여백 추가
          >
            <Pressable 
              className="overflow-hidden rounded-2xl"
              style={SHADOWS.medium}
              onPress={() => router.push(`/calendar/edit/${id}`)}
            >
              <LinearGradient
                colors={[COLORS.love, COLORS.primary]}
                className="py-4 px-6"
              >
                <View className="flex-row items-center justify-center space-x-2">
                  <Ionicons name="pencil" size={20} color="white" />
                  <Text className="text-white text-base font-bold">
                    데이트 일정 수정하기
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
} 