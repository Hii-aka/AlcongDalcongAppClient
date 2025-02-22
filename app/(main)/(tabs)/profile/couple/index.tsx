import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import EmailInput from '@/components/couple/EmailInput';
import DatePicker from '@/components/couple/DatePicker';
import useCreateCouple from '@/hooks/queries/useCreateCouple';
import Animated, { FadeInDown } from 'react-native-reanimated';

// 한국어 로케일 설정
dayjs.locale('ko');

interface CoupleForm {
  receiverEmail: string;
  firstMetDate: string;
  coupleNickname: string;
}

export default function CoupleConnect() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createCoupleMutation = useCreateCouple();
  const coupleForm = useForm<CoupleForm>({
    defaultValues: {
      receiverEmail: '',
      firstMetDate: '',
      coupleNickname: '',
    },
  });

  const onSubmit = async (data: CoupleForm) => {
    const {receiverEmail, firstMetDate} = data;
    try {
      setIsSubmitting(true);
      createCoupleMutation.mutate({
        receiverEmail,
        firstMetDate,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        <View className="flex-row border-b border-pink-100 bg-white/80 mt-2">
          <Pressable className="flex-1 py-4 items-center border-b-2 border-pink-500">
            <Text className="text-pink-500 font-semibold">커플 연결하기</Text>
          </Pressable>
          <Pressable 
            className="flex-1 py-4 items-center"
            onPress={() => router.push("/(main)/(tabs)/profile/couple/requests")}
          >
            <Text className="text-gray-500">받은 신청</Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {/* 헤더 섹션 */}
            <Animated.View 
              entering={FadeInDown.duration(600)}
              className="items-center px-6 py-8"
            >
              <LinearGradient
                colors={[COLORS.love, COLORS.primary]}
                className="w-20 h-20 rounded-full items-center justify-center mb-4"
                style={SHADOWS.medium}
              >
                <FontAwesome5 name="heart" size={32} color="#FFFFFF" />
              </LinearGradient>
              <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
                연인과 연결하기
              </Text>
              <Text className="text-gray-500 text-center px-6">
                상대방의 이메일을 입력하여 커플 신청을 보내세요
              </Text>
            </Animated.View>

            {/* 메인 폼 */}
            <Animated.View 
              entering={FadeInDown.delay(200).duration(600)}
              className="px-6"
            >
              <View className="bg-white/80 p-6 rounded-3xl shadow-sm border border-pink-100">
                <FormProvider {...coupleForm}>
                  <View className="space-y-6">
                    {/* 이메일 입력 */}
                    <EmailInput />

                    {/* 처음 만난 날짜 */}
                    <DatePicker />

                    {/* 커플 닉네임 */}
                    <View>
                      <Text className="text-gray-600 font-medium mb-2">
                        커플 닉네임
                        <Text className="text-gray-400 text-sm font-normal"> (선택)</Text>
                      </Text>
                      <Pressable 
                        className="flex-row items-center border border-pink-100 rounded-xl px-4 py-3 bg-white"
                      >
                        <MaterialIcons name="favorite" size={20} color={COLORS.love} />
                        <TextInput
                          placeholder="커플 닉네임을 입력하세요"
                          className="flex-1 ml-2 text-base text-gray-800"
                          placeholderTextColor="#9CA3AF"
                          onChangeText={(text) => coupleForm.setValue('coupleNickname', text)}
                          returnKeyType="done"
                        />
                      </Pressable>
                    </View>

                    {/* 제출 버튼 */}
                    <Pressable
                      onPress={coupleForm.handleSubmit(onSubmit)}
                      disabled={isSubmitting || !coupleForm.watch('receiverEmail') || !coupleForm.watch('firstMetDate')}
                      className="mt-6 overflow-hidden rounded-2xl"
                      style={SHADOWS.medium}
                    >
                      <LinearGradient
                        colors={[COLORS.love, COLORS.primary]}
                        className="py-4 px-6"
                      >
                        <Text className="text-white text-center font-bold text-lg">
                          {isSubmitting ? "신청 중..." : "커플 신청하기"}
                        </Text>
                        {isSubmitting && (
                          <ActivityIndicator size="small" color="white" style={{ marginLeft: 8 }} />
                        )}
                      </LinearGradient>
                    </Pressable>
                  </View>
                </FormProvider>
              </View>
            </Animated.View>

            {/* 안내 메시지 */}
            <Animated.View 
              entering={FadeInDown.delay(400).duration(600)}
              className="mt-6 mx-6"
            >
              <View className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                <View className="flex-row items-center mb-2">
                  <MaterialIcons name="info" size={20} color={COLORS.love} />
                  <Text className="ml-2 font-medium text-pink-600">알려드립니다</Text>
                </View>
                <Text className="text-pink-600 text-sm leading-5">
                  • 입력하신 이메일로 상대방에게 초대장이 발송됩니다.{'\n'}
                  • 상대방이 수락하면 연결이 완료됩니다.{'\n'}
                  • 연결이 완료되면 알림을 보내드립니다.
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
} 