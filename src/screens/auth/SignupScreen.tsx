import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authNavigations } from '@/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { useNavigation } from '@react-navigation/native';
import InputField from '@/components/common/InputField';
import useForm from '@/hooks/useForm';
import { validateSignup } from '@/utils';

function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });
  
  return (
    <SafeAreaView className="flex-1 bg-white">
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
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">비밀번호</Text>
                <InputField
                  placeholder="비밀번호를 입력하세요"
                  secureTextEntry
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">비밀번호 확인</Text>
                <InputField
                  placeholder="비밀번호를 다시 입력하세요"
                  secureTextEntry
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">이름</Text>
                <TextInput 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="이름을 입력하세요"
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">생년월일</Text>
                <TextInput 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <Pressable 
                className="w-full bg-black py-3 rounded-lg mt-6"
                onPress={() => {/* TODO: 회원가입 처리 */}}
              >
                <Text className="text-white text-center font-medium">가입하기</Text>
              </Pressable>

              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-sm text-gray-500">이미 계정이 있으신가요? </Text>
                <Pressable onPress={() => navigation.navigate(authNavigations.AUTH_HOME)}>
                  <Text className="text-black font-medium">로그인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignupScreen;