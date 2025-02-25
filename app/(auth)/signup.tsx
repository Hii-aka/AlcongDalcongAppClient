import React from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '@/constants/theme';
import EmailInput from '../../components/input/EmailInput';
import PasswordInput from '@/components/input/PasswordInput';
import PasswordConfirmInput from '@/components/input/PasswordConfirmInput';
import NicknameInput from '@/components/input/NicknameInput';
import useAuth from '@/hooks/queries/useAuth';
import GenderSelector from '@/components/auth/GenderSelector';

type SignupForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  gender: string;
};

const formFields = [
  { id: 'email', label: '이메일', icon: 'mail', Component: EmailInput },
  { id: 'nickname', label: '닉네임', icon: 'person', Component: NicknameInput },
  { id: 'gender', label: '성별', icon: 'male-female', Component: GenderSelector },
  { id: 'password', label: '비밀번호', icon: 'lock-closed', Component: PasswordInput },
  { id: 'passwordConfirm', label: '비밀번호 확인', icon: 'shield-checkmark', Component: PasswordConfirmInput },
];

export default function Signup() {
  const signup = useForm<SignupForm>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      gender: '',
    },
  });

  const {signUpMutation} = useAuth();

  const onSubmit = async (data: SignupForm) => {
    const {email, password, nickname, gender} = data;
    signUpMutation.mutate({email, password, nickname, gender});
  };

  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={[COLORS.love, COLORS.primary]}
        className="px-6 py-8"
      >
        <View className="items-center">
          <View className="bg-white rounded-full p-4 mb-4">
            <Ionicons name="heart" size={32} color={COLORS.love} />
          </View>
          <Text className="text-3xl font-bold text-white text-center">
            함께해요
          </Text>
          <Text className="text-white/90 text-center mt-2">
            소중한 추억을 만들어갈 준비가 되셨나요?
          </Text>
        </View>
      </LinearGradient>

      {/* Progress indicator */}
      <View className="flex-row justify-between px-6 py-4">
        {[1, 2, 3, 4].map((step) => (
          <View 
            key={step}
            className={`h-1.5 flex-1 mx-1 rounded-full ${
              step <= 2 ? 'bg-pink-500' : 'bg-pink-100'
            }`}
          />
        ))}
      </View>
    </View>
  );

  const renderField = ({ item, index }: { item: typeof formFields[0], index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(300)}
      className="px-6 mb-6"
    >
      <Text className="text-base font-semibold text-gray-700 mb-2">
        <Ionicons name={item.icon as any} size={16} color={COLORS.love} className="mr-2" />
        {item.label}
      </Text>
      <View 
        className="bg-pink-50/30 rounded-2xl overflow-hidden"
        style={SHADOWS.small}
      >
        <item.Component />
      </View>
    </Animated.View>
  );

  const renderFooter = () => (
    <View className="px-6 pb-6">
      {/* 회원가입 버튼 */}
      <Animated.View 
        entering={FadeInDown.delay(700).duration(300)}
        className="mt-2"
      >
        <Pressable
          className="overflow-hidden rounded-2xl"
          style={SHADOWS.medium}
          onPress={signup.handleSubmit(onSubmit)}
        >
          <LinearGradient
            colors={[COLORS.love, COLORS.primary]}
            className="py-4 px-6"
          >
            <View className="flex-row items-center justify-center space-x-2">
              {signup.formState.isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="heart" size={20} color="white" />
                  <Text className="text-white text-base font-bold">
                    시작하기
                  </Text>
                </>
              )}
            </View>
          </LinearGradient>
        </Pressable>

        {Object.keys(signup.formState.errors).length > 0 && (
          <Text className="text-rose-500 text-center mt-3 text-sm font-medium">
            모든 필드를 올바르게 입력해주세요
          </Text>
        )}
      </Animated.View>

      {/* 로그인 링크 */}
      <Animated.View 
        entering={FadeInDown.delay(800).duration(300)}
        className="flex-row justify-center items-center mt-6"
      >
        <Text className="text-gray-600">이미 계정이 있으신가요? </Text>
        <Pressable 
          onPress={() => router.replace('/')}
          className="px-2 py-1"
        >
          <Text className="text-pink-500 font-semibold">로그인하기</Text>
        </Pressable>
      </Animated.View>
    </View>
  );

  return (
    <LinearGradient
      colors={[COLORS.backgroundAlt, COLORS.background]}
      className="flex-1"
    >
      <FormProvider {...signup}>
        <FlatList
          data={formFields}
          renderItem={renderField}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 56 }}
        />
      </FormProvider>
    </LinearGradient>
  );
}