import React, { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SHADOWS } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Message } from '@/app/(main)/(tabs)/chat';
import { requestDateCourseRecommendation } from '@/api/ai';

declare global {
  var aiMessagesCallback: ((message: Message) => void) | null;
  var aiUpdateMessageCallback: ((messageId: number, chunk: string) => void) | null;
}

export type RecommendationOptions = {
  mood: string;
  region: string[];
  location: string;
  budget: string;
  time: string[];
  special: string[];
  customMood: string;
  customRegion: string;
  customSpecial: string;
};

const RecommendationOptions = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<RecommendationOptions>({
    mood: '',
    region: [],
    location: '',
    budget: '',
    time: [],
    special: [],
    customMood: '',
    customRegion: '',
    customSpecial: ''
  });

  // 분위기 옵션
  const moods = [
    { id: 'romantic', label: '로맨틱한' },
    { id: 'casual', label: '캐주얼한' },
    { id: 'exciting', label: '활동적인' },
    { id: 'quiet', label: '조용한' },
    { id: 'custom', label: '기타' },
  ];

  // 지역 옵션
  const regions = [
    { id: 'seoul', label: '서울' },
    { id: 'incheon', label: '인천' },
    { id: 'busan', label: '부산' },
    { id: 'daegu', label: '대구' },
    { id: 'gwangju', label: '광주' },
    { id: 'custom', label: '기타' },
  ];

  // 위치 옵션
  const locations = [
    { id: 'indoor', label: '실내' },
    { id: 'outdoor', label: '야외' },
    { id: 'anywhere', label: '상관없음' },
  ];

  // 예산 옵션
  const budgets = [
    { id: 'low', label: '저렴한 (5만원 이하)' },
    { id: 'medium', label: '적당한 (5-10만원)' },
    { id: 'high', label: '높은 (10만원+)' },
  ];

  // 시간대 옵션
  const times = [
    { id: 'morning', label: '아침/오전' },
    { id: 'afternoon', label: '오후' },
    { id: 'evening', label: '저녁' },
    { id: 'night', label: '밤' },
  ];

  // 스페셜 옵션
  const specials = [
    { id: 'anniversary', label: '기념일' },
    { id: 'first_date', label: '첫 데이트' },
    { id: 'surprise', label: '깜짝 이벤트' },
    { id: 'food', label: '맛집 위주' },
    { id: 'activity', label: '액티비티' },
    { id: 'custom', label: '기타' },
  ];

  const handleSelectOption = (category: keyof RecommendationOptions, value: string) => {
    if (category === 'region' || category === 'time' || category === 'special') {
      setOptions(prev => {
        const currentValues = Array.isArray(prev[category]) ? [...prev[category]] : [];

        if (currentValues.includes(value)) {
          return {
            ...prev,
            [category]: currentValues.filter(item => item !== value)
          };
        }

        return {
          ...prev,
          [category]: [...currentValues, value]
        };
      });

      return;
    }

    setOptions(prev => ({
      ...prev,
      [category]: prev[category] === value ? '' : value
    }));
  };

  const handleCustomInput = (category: 'customMood' | 'customRegion' | 'customSpecial', value: string) => {
    setOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const requestRecommendation = async () => {
    try {
      setLoading(true);

      const finalOptions = {
        ...options,
        mood: options.mood === 'custom' ? options.customMood : options.mood,
        region: options.region.includes('custom')
          ? [...options.region.filter(r => r !== 'custom'), options.customRegion]
          : options.region,
        special: options.special.includes('custom')
          ? [...options.special.filter(s => s !== 'custom'), options.customSpecial]
          : options.special
      };

      console.log('추천 옵션:', finalOptions);

      const newMessageId = Date.now();
      const newMessage: Message = {
        id: newMessageId,
        sender: 'AI',
        text: '',
        timestamp: new Date().toISOString()
      };

      if (global.aiMessagesCallback) {
        global.aiMessagesCallback(newMessage);
      }

      router.back();

      await requestDateCourseRecommendation(finalOptions, (chunk) => {
        if (global.aiUpdateMessageCallback) {
          global.aiUpdateMessageCallback(newMessageId, chunk);
        }
      });

    } catch (error) {
      console.error('추천 요청 중 오류 발생:', error);
      if (global.aiMessagesCallback) {
        global.aiMessagesCallback({
          id: Date.now(),
          sender: 'AI',
          text: "죄송합니다. 추천을 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.",
          timestamp: new Date().toISOString()
        });
      }

      Alert.alert('오류', '추천을 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const renderOptionButtons = (
    category: keyof RecommendationOptions,
    items: Array<{ id: string; label: string }>,
    multiSelect = false
  ) => {
    return (
      <View>
        <View className="flex-row flex-wrap">
          {items.map(item => {
            const isSelected = multiSelect || category === 'region' || category === 'time'
              ? Array.isArray(options[category]) && options[category].includes(item.id)
              : options[category] === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                className={`m-1 px-4 py-2 rounded-full border ${isSelected
                  ? 'bg-pink-500 border-pink-500'
                  : 'bg-white border-pink-100'
                  }`}
                style={SHADOWS.small}
                onPress={() => handleSelectOption(category, item.id)}
              >
                <Text
                  className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700'
                    }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {((category === 'mood' && options.mood === 'custom') ||
          (category === 'region' && options.region.includes('custom')) ||
          (category === 'special' && options.special.includes('custom'))) && (
            <TextInput
              className="mt-2 p-2 border border-pink-100 rounded-lg"
              placeholder="직접 입력해주세요"
              value={
                category === 'mood'
                  ? options.customMood
                  : category === 'region'
                    ? options.customRegion
                    : options.customSpecial
              }
              onChangeText={(text) =>
                handleCustomInput(
                  category === 'mood'
                    ? 'customMood'
                    : category === 'region'
                      ? 'customRegion'
                      : 'customSpecial',
                  text
                )
              }
            />
          )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <View className="bg-pink-500 px-4 py-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white ml-4">데이트 코스 옵션 선택</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1 p-4"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 100 : 20, paddingTop: 12 }}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="bg-white rounded-2xl p-4 mb-4" style={SHADOWS.medium}>
          <Text className="text-lg font-bold text-gray-800 mb-2">어떤 분위기를 원하세요?</Text>
          {renderOptionButtons('mood', moods)}
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4" style={SHADOWS.medium}>
          <Text className="text-lg font-bold text-gray-800 mb-2">어떤 지역을 원하세요?</Text>
          {renderOptionButtons('region', regions, true)}
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4" style={SHADOWS.medium}>
          <Text className="text-lg font-bold text-gray-800 mb-2">장소 유형</Text>
          {renderOptionButtons('location', locations)}
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4" style={SHADOWS.medium}>
          <Text className="text-lg font-bold text-gray-800 mb-2">예산</Text>
          {renderOptionButtons('budget', budgets)}
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4" style={SHADOWS.medium}>
          <Text className="text-lg font-bold text-gray-800 mb-2">시간대</Text>
          {renderOptionButtons('time', times, true)}
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4" style={SHADOWS.medium}>
          <Text className="text-lg font-bold text-gray-800 mb-2">특별 요소</Text>
          {renderOptionButtons('special', specials, true)}
        </View>

        <TouchableOpacity
          className={`${loading ? 'bg-gray-400' : 'bg-pink-500'} rounded-full py-4 items-center justify-center mb-8`}
          style={SHADOWS.medium}
          onPress={requestRecommendation}
          disabled={loading}
        >
          <Text className="text-white font-bold text-lg">
            추천받기
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RecommendationOptions;
