import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type CoupleForm = {
  partnerEmail: string;
  anniversaryDate: string;
  coupleNickname: string;
};

export default function CoupleConnection() {
  const form = useForm<CoupleForm>({
    defaultValues: {
      partnerEmail: '',
      anniversaryDate: '',
      coupleNickname: '',
    },
  });

  const onSubmit = (data: CoupleForm) => {
    console.log(data);
    // TODO: 커플 연결 로직 구현
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="px-4 py-8">
            {/* 헤더 섹션 */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-pink-100 rounded-full items-center justify-center mb-4">
                <FontAwesome name="heart" size={32} color="#EC4899" />
              </View>
              <Text className="text-3xl font-bold text-center text-custom mb-2">
                커플 연결
              </Text>
              <Text className="text-gray-500 text-center">
                상대방과 함께 특별한 추억을 만들어보세요
              </Text>
            </View>

            {/* 메인 폼 */}
            <View className="bg-white p-6 rounded-2xl shadow-sm">
              <FormProvider {...form}>
                <View className="space-y-6">
                  {/* 이메일 입력 */}
                  <View>
                    <Text className="text-gray-600 font-medium mb-2">
                      상대방 이메일
                    </Text>
                    <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                      <MaterialIcons name="email" size={20} color="#9CA3AF" />
                      <TextInput
                        placeholder="상대방의 이메일을 입력하세요"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="flex-1 ml-2 text-base"
                        onChangeText={(text) => form.setValue('partnerEmail', text)}
                      />
                    </View>
                  </View>

                  {/* 기념일 입력 */}
                  <View>
                    <Text className="text-gray-600 font-medium mb-2">
                      처음 만난 날
                    </Text>
                    <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                      <MaterialIcons name="event" size={20} color="#9CA3AF" />
                      <TextInput
                        placeholder="YYYY-MM-DD"
                        className="flex-1 ml-2 text-base"
                        onChangeText={(text) => form.setValue('anniversaryDate', text)}
                      />
                    </View>
                  </View>

                  {/* 커플 닉네임 */}
                  <View>
                    <Text className="text-gray-600 font-medium mb-2">
                      커플 닉네임
                    </Text>
                    <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                      <MaterialIcons name="favorite" size={20} color="#9CA3AF" />
                      <TextInput
                        placeholder="커플 닉네임을 입력하세요"
                        className="flex-1 ml-2 text-base"
                        onChangeText={(text) => form.setValue('coupleNickname', text)}
                      />
                    </View>
                  </View>

                  {/* 제출 버튼 */}
                  <CustomButton
                    onPress={form.handleSubmit(onSubmit)}
                    label="연결하기"
                    className="mt-4"
                  />
                </View>
              </FormProvider>
            </View>

            {/* 안내 메시지 */}
            <View className="mt-6 bg-blue-50 p-4 rounded-xl">
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="info" size={20} color="#3B82F6" />
                <Text className="ml-2 font-medium text-blue-600">
                  알려드립니다
                </Text>
              </View>
              <Text className="text-blue-600 text-sm">
                입력하신 이메일로 상대방에게 초대장이 발송됩니다.
                상대방이 수락하면 연결이 완료됩니다.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
