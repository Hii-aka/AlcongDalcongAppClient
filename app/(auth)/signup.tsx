import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
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

  return (
    <LinearGradient
      colors={['#FFD6D6', '#FFE5E5', '#FFF']}
      className="flex-1"
    >
      <ScrollView className="flex-1">
        <Animated.View 
          entering={FadeInUp.duration(1000)}
          className="py-14 px-6 max-w-md mx-auto w-full"
        >
          <View className="rounded-3xl p-6 bg-white/90 shadow-lg">
            <View className="mb-8">
              <Text className="text-3xl font-bold text-center text-pink-600">
                함께해요
              </Text>
              <Text className="text-center text-gray-600 mt-2">
                소중한 추억을 만들어갈 준비가 되셨나요?
              </Text>
            </View>

            <FormProvider {...signup}>
              <View className="space-y-5">
                {/* Progress indicator */}
                <View className="flex-row justify-between mb-6">
                  {[1, 2, 3, 4].map((step) => (
                    <View 
                      key={step}
                      className="h-2 flex-1 mx-1 rounded-full bg-pink-200"
                    />
                  ))}
                </View>

                <EmailInput />
                <NicknameInput />
                <GenderSelector />
                <PasswordInput submitBehavior="submit" />
                <PasswordConfirmInput />

                <View className="bg-gradient-to-b from-pink-300 to-pink-200 p-6 rounded-3xl -mx-2 shadow-inner">
                  <View className="relative">
                    {/* Button shine effect overlay */}
                    <View className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl" />
                    
                    <Pressable 
                      className="w-full bg-gradient-to-r from-white to-white/95
                        py-6 rounded-2xl shadow-2xl shadow-pink-900/30
                        active:scale-95 transition-all border-[2.5px] border-pink-100
                        elevation-8"
                      onPress={signup.handleSubmit(onSubmit)}
                      style={({ pressed }) => [
                        {
                          transform: [{ scale: pressed ? 0.98 : 1 }],
                          opacity: pressed ? 0.9 : 1,
                        }
                      ]}
                    >
                      <View className="flex-row items-center justify-center space-x-3">
                        <Text className="text-gray-600 text-center font-extrabold text-2xl tracking-wider">
                          시작하기
                        </Text>
                        <View className="bg-gray-100 rounded-full p-2">
                          <Text className="text-gray-600 text-xl">→</Text>
                        </View>
                      </View>

                      {signup.formState.isSubmitting && (
                        <View className="absolute right-4 top-1/2 -translate-y-1/2">
                          <ActivityIndicator color="gray" size="small" />
                        </View>
                      )}
                    </Pressable>

                    {Object.keys(signup.formState.errors).length > 0 && (
                      <Text className="text-rose-800 text-center mt-3 text-sm font-medium">
                        모든 필드를 올바르게 입력해주세요
                      </Text>
                    )}
                  </View>
                </View>

                <View className="h-6" />

                <View className="flex-row justify-center items-center mt-2 mb-6 opacity-80">
                  <Text className="text-gray-600">이미 계정이 있으신가요? </Text>
                  <Pressable 
                    onPress={() => router.replace('/')}
                    className="px-2 py-1"
                  >
                    <Text className="text-pink-600 font-semibold">로그인하기</Text>
                  </Pressable>
                </View>
              </View>
            </FormProvider>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}