import React from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
interface GenderProps {}

const Gender = ({}: GenderProps) => {
  const router = useRouter();

  const handleGenderPress = (gender: string) => {
    if (gender === 'male') {
      router.push({
        pathname: '/(auth)/male-signup',
        params: { gender }
      });
    } else {
      router.push({
        pathname: '/(auth)/female-signup',
        params: { gender }
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="pt-[60px] pb-[70px] px-4 items-center">
        <Text className="text-4xl font-bold mb-16 text-center text-gray-800">
          성별을 선택해주세요
        </Text>

        <View className="flex flex-col gap-6 w-full max-w-sm">
          <Pressable
            className="bg-white rounded-2xl shadow-md border-2 border-gray-200 
              flex flex-row items-center p-6 w-full"
            onPress={() => handleGenderPress('male')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40',
              }}
              className="w-16 h-16 rounded-full"
            />
            <Text className="text-xl font-bold ml-6 text-gray-800">남성</Text>
          </Pressable>

          <Pressable
            className="bg-white rounded-2xl shadow-md border-2 border-gray-200 
              flex flex-row items-center p-6 w-full"
            onPress={() => handleGenderPress('female')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
              }}
              className="w-16 h-16 rounded-full"
            />
            <Text className="text-xl font-bold ml-6 text-gray-800">여성</Text>
          </Pressable>
        </View>

        <Text className="mt-8 text-gray-500 text-sm text-center">
          회원가입을 위해 성별을 선택해주세요
        </Text>
      </View>
    </ScrollView>
  );
};

export default Gender;