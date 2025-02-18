import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import InputField from '../../components/input/InputField';
import { router } from 'expo-router';
import EmailInput from '../../components/input/EmailInput';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import PasswordInput from '@/components/input/PasswordInput';
import PasswordConfirmInput from '@/components/input/PasswordConfirmInput';
import { signUp } from '@/api/auth';

type SignupForm = {
  email: string;
  password: string;
  passwordConfirm: string;
};

  export default function MaleSignup() {
  const signup = useForm<SignupForm>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data: SignupForm) => {
    const {email, password, passwordConfirm} = data;
    console.log(data);
    try {
      const response = await signUp({email, password});
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      console.log('가입 완료');
    }
    // TODO: Implement signup logic
  };
  
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="py-14 max-w-md mx-auto w-full">
          <View className="bg-white rounded-lg p-6">
            <Text className="text-2xl font-bold text-center mb-6">남성 회원가입</Text>
            <FormProvider {...signup}>  
            <View className="space-y-4">
              <EmailInput />
              <PasswordInput submitBehavior="submit" />
              <PasswordConfirmInput />
              <Pressable 
                className="w-full bg-black py-3 rounded-lg mt-6"
                onPress={signup.handleSubmit(onSubmit)}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                    opacity: pressed ? 0.8 : 1,
                  }
                ]}
              >
                <Text className="text-white text-center font-medium">가입하기</Text>
              </Pressable>

              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-sm text-gray-500">이미 계정이 있으신가요? </Text>
                <Pressable onPress={() => router.replace('/')}>
                  <Text className="text-black font-medium">로그인</Text>
                </Pressable>
              </View>
            </View>
            </FormProvider>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 