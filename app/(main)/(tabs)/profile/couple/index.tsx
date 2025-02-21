import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import EmailInput from '@/components/couple/EmailInput';
import DatePicker from '@/components/couple/DatePicker';
import useCreateCouple from '@/hooks/queries/useCreateCouple';
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
  const form = useForm<CoupleForm>({
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
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <View className="flex-row border-b border-gray-200 bg-white">
        <Pressable className="flex-1 py-3 items-center border-b-2 border-pink-500">
          <Text className="text-pink-500 font-semibold">커플 연결하기</Text>
        </Pressable>
        <Pressable 
          className="flex-1 py-3 items-center"
          onPress={() => router.navigate("/profile/couple/requests")}
        >
          <Text className="text-gray-500">받은 신청</Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-4 py-8">
            {/* 헤더 섹션 */}
            <View className="items-center mb-8">
              <Pressable 
                className="w-20 h-20 bg-pink-100 rounded-full items-center justify-center mb-4"
                style={({ pressed }) => [
                  pressed && { transform: [{ scale: 0.95 }] }
                ]}
              >
                <FontAwesome name="heart" size={32} color="#EC4899" />
              </Pressable>
              <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
                연인과 연결하기
              </Text>
              <Text className="text-gray-500 text-center px-6">
                상대방의 이메일을 입력하여 커플 신청을 보내세요
              </Text>
            </View>

            {/* 메인 폼 */}
            <View className="bg-white p-6 rounded-2xl shadow-sm">
              <FormProvider {...form}>
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
                      className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
                    >
                      <MaterialIcons name="favorite" size={20} color="#9CA3AF" />
                      <TextInput
                        placeholder="커플 닉네임을 입력하세요"
                        className="flex-1 ml-2 text-base"
                        onChangeText={(text) => form.setValue('coupleNickname', text)}
                        returnKeyType="done"
                      />
                    </Pressable>
                  </View>

                  {/* 제출 버튼 */}
                  <CustomButton
                    onPress={form.handleSubmit(onSubmit)}
                    label={isSubmitting ? "신청 중..." : "커플 신청하기"}
                    disabled={isSubmitting || !form.watch('receiverEmail') || !form.watch('firstMetDate')}
                    className="mt-6"
                  >
                    {isSubmitting && (
                      <ActivityIndicator size="small" color="white" style={{ marginLeft: 8 }} />
                    )}
                  </CustomButton>
                </View>
              </FormProvider>
            </View>

            {/* 안내 메시지 */}
            <View className="mt-6 bg-blue-50 p-4 rounded-xl">
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="info" size={20} color="#3B82F6" />
                <Text className="ml-2 font-medium text-blue-600">알려드립니다</Text>
              </View>
              <Text className="text-blue-600 text-sm leading-5">
                • 입력하신 이메일로 상대방에게 초대장이 발송됩니다.{'\n'}
                • 상대방이 수락하면 연결이 완료됩니다.{'\n'}
                • 연결이 완료되면 알림을 보내드립니다.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 