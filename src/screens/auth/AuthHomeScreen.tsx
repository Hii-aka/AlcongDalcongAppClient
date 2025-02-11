import React from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import InputField from '@/components/common/InputField';
export function AuthHomeScreen() {


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center px-4">
        <View className="w-full max-w-sm">
          <View className="items-center mb-8">
            <Text className="text-2xl text-custom mb-2">알콩달콩</Text>
            <Text className="text-gray-600">커플 다이어리에 오신 것을 환영합니다</Text>
          </View>

          <View className="bg-white rounded-lg shadow-sm p-6 w-full">
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">이메일</Text>
                <InputField
                  placeholder="이메일을 입력하세요"
                  inputMode="email"
                />
              </View>
              
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">비밀번호</Text>
                <InputField
                  placeholder="비밀번호를 입력하세요"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity className="w-full bg-black py-2 px-4 rounded-md">
                <Text className="text-white text-center">로그인</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-4 flex-row items-center justify-center">
              <Text className="text-sm text-gray-600 mr-2">
                아직 회원이 아니신가요?
              </Text>
              <TouchableOpacity>
                <Text className="text-sm font-bold text-black">회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 