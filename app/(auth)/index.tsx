import React, {useRef} from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import InputField from '../../components/input/InputField';
import useForm from '../../hooks/useForm';
import { validateUser } from '../../utils/validate';
import { Link } from 'expo-router';
import useAuth from '../../hooks/queries/useAuth';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';

export default function AuthHome() {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput>(null);
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateUser,
  });

  const handleSubmit = () => {
    console.log(login.values);
    loginMutation.mutate({email: login.values.email, password: login.values.password}, {
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
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">이메일</Text>
                <InputField
                  autoFocus
                  placeholder="이메일을 입력하세요"
                  error={login.errors.email}
                  touched={login.touched.email}
                  inputMode="email"
                  {...login.getTextInputProps('email')}
                />
              </View>
              
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">비밀번호</Text>
                <InputField
                  ref={passwordRef}
                  placeholder="비밀번호를 입력하세요"
                  secureTextEntry
                  {...login.getTextInputProps('password')}
                />
              </View>
              <CustomButton
                onPress={handleSubmit}
                label="로그인"
              />
            </View>
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