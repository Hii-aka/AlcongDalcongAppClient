import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import useAuth from '../../hooks/queries/useAuth';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from '@/components/input/EmailInput';
import PasswordInput from '@/components/input/PasswordInput';
import Toast from 'react-native-toast-message';

type LoginForm = {
  email: string;
  password: string;
};

export default function AuthHome() {
  const {loginMutation, isAuthenticated} = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/(main)/(tabs)/diary');
    }
  }, [isAuthenticated]);

  const login = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginForm) => {
    const {email, password} = data;
    loginMutation.mutate({email, password}, {
      onSuccess: () => {
        router.push('/(main)/(tabs)/diary');
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: '로그인에 실패했습니다',
          text2: '이메일과 비밀번호를 확인해주세요',
        });
      }
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-sm">
          <View className="items-center mb-8">
            <View className="w-20 h-20 mb-4 bg-pink-100 rounded-2xl items-center justify-center">
              <FontAwesome5 
                name="heart" 
                size={32} 
                color="#F472B6"
              />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              알콩달콩
            </Text>
            <Text className="text-gray-600 text-center leading-5">
              소중한 추억을 기록하는{'\n'}커플 다이어리
            </Text>
          </View>

          <View className="bg-white rounded-2xl shadow-sm p-6 w-full border border-gray-100">
            <FormProvider {...login}>
              <View className="space-y-4">
                <EmailInput />
                <PasswordInput />
                <CustomButton
                  onPress={login.handleSubmit(onSubmit)}
                  label="로그인"
                  isLoading={loginMutation.isPending}
                  className="mt-2"
                />
              </View>
            </FormProvider>

            {loginMutation.isError && (
              <View className="mt-3 bg-red-50 rounded-lg p-3">
                <Text className="text-red-600 text-sm text-center">
                  이메일 또는 비밀번호가 올바르지 않습니다
                </Text>
              </View>
            )}
          </View>

          <View className="mt-6 flex-row items-center justify-center">
            <Text className="text-gray-600 mr-2">
              아직 회원이 아니신가요?
            </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity 
                className="bg-gray-50 px-3 py-2 rounded-full"
                activeOpacity={0.7}
              >
                <Text className="font-bold text-pink-500">
                  회원가입
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="mt-4 flex-row justify-center">
            <TouchableOpacity 
              className="px-4 py-2"
              activeOpacity={0.7}
            >
              <Text className="text-sm text-gray-500">
                비밀번호 찾기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
} 