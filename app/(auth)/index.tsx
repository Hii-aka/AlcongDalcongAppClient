import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import useAuth from '../../hooks/queries/useAuth';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from '@/components/input/EmailInput';
import PasswordInput from '@/components/input/PasswordInput';

type LoginForm = {
  email: string;
  password: string;
};

export default function AuthHome() {
  const {loginMutation} = useAuth();
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
        console.log(error);
      }
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center px-4">
        <View className="w-full max-w-sm">
          <View className="items-center mb-8">
            <Text className="text-2xl text-custom mb-2">알콩달콩</Text>
            <Text className="text-gray-600">커플 다이어리에 오신 것을 환영합니다</Text>
          </View>

          <View className="bg-white rounded-lg shadow-sm p-6 w-full">
            <FormProvider {...login}>
            <View className="space-y-4">
              <EmailInput />
              <PasswordInput />
              <CustomButton
                onPress={login.handleSubmit(onSubmit)}
                label="로그인"
              />
            </View>
            </FormProvider>
            </View>

            <View className="mt-4 flex-row items-center justify-center">
              <Text className="text-sm text-gray-600 mr-2">
                아직 회원이 아니신가요?
              </Text>
              <Link href="/(auth)/gender" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-black">회원가입</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>  
  );
} 