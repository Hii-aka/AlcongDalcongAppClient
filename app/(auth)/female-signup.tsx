import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import InputField from '../../components/input/InputField';
import useForm from '../../hooks/useForm';
import { router } from 'expo-router';
import { validateSignup } from '../../utils/validate';


  export default function FemaleSignup() {
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    console.log(signup.values);
    // TODO: Implement signup logic
  };
  
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="py-14 max-w-md mx-auto w-full">
          <View className="bg-white rounded-lg p-6">
            <Text className="text-2xl font-bold text-center mb-6">회원가입</Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">이메일</Text>
                <InputField
                  placeholder="이메일을 입력하세요"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={signup.errors.email}
                  touched={signup.touched.email}
                  {...signup.getTextInputProps('email')}
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">비밀번호</Text>
                <InputField
                  placeholder="비밀번호를 입력하세요"
                  secureTextEntry
                  error={signup.errors.password}
                  touched={signup.touched.password}
                  {...signup.getTextInputProps('password')}
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">비밀번호 확인</Text>
                <InputField
                  placeholder="비밀번호를 다시 입력하세요"
                  secureTextEntry
                  error={signup.errors.passwordConfirm}
                  touched={signup.touched.passwordConfirm}
                  {...signup.getTextInputProps('passwordConfirm')}
                />
              </View>

              {/* <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">이름</Text>
                <InputField
                  placeholder="이름을 입력하세요"
                  error={signup.errors.name}
                  touched={signup.touched.name}
                  {...signup.getTextInputProps('name')}
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">생년월일</Text>
                <InputField
                  placeholder="YYYY-MM-DD"
                  error={signup.errors.birthDate}
                  touched={signup.touched.birthDate}
                  {...signup.getTextInputProps('birthDate')}
                />
              </View> */}

              <Pressable 
                className="w-full bg-black py-3 rounded-lg mt-6"
                onPress={handleSubmit}
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 