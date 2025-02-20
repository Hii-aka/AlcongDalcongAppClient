import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

type ProfileForm = {
  nickname: string;
  statusMessage: string;
};

export default function ProfileEdit() {
  const [profileImage, setProfileImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40'
  );

  const form = useForm<ProfileForm>({
    defaultValues: {
      nickname: '김철수',
      statusMessage: '행복한 하루 보내세요',
    },
  });

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
    }
  };

  const onSubmit = (data: ProfileForm) => {
    console.log({ ...data, profileImage });
    // TODO: 프로필 업데이트 로직 구현
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-4">
          {/* 헤더 */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-900">프로필 수정</Text>
            <Text className="text-gray-500 mt-1">
              프로필 정보를 수정할 수 있습니다
            </Text>
          </View>

          {/* 프로필 이미지 섹션 */}
          <View className="items-center mb-8">
            <View className="relative">
              <Image
                source={{ uri: profileImage || undefined }}
                className="w-32 h-32 rounded-full"
              />
              <TouchableOpacity
                onPress={pickImage}
                className="absolute bottom-0 right-0 bg-black p-2 rounded-full"
              >
                <MaterialIcons name="camera-alt" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={pickImage} className="mt-4">
              <Text className="text-black font-medium">프로필 사진 변경</Text>
            </TouchableOpacity>
          </View>

          {/* 프로필 정보 폼 */}
          <FormProvider {...form}>
            <View className="space-y-6">
              {/* 닉네임 입력 */}
              <View>
                <Text className="text-gray-600 font-medium mb-2">닉네임</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                  <MaterialIcons name="person" size={20} color="#9CA3AF" />
                  <TextInput
                    placeholder="닉네임을 입력하세요"
                    className="flex-1 ml-2 text-base"
                    defaultValue={form.getValues('nickname')}
                    onChangeText={(text) => form.setValue('nickname', text)}
                  />
                </View>
              </View>

              {/* 상태 메시지 입력 */}
              <View>
                <Text className="text-gray-600 font-medium mb-2">상태 메시지</Text>
                <View className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                  <TextInput
                    placeholder="상태 메시지를 입력하세요"
                    className="text-base"
                    multiline
                    numberOfLines={3}
                    defaultValue={form.getValues('statusMessage')}
                    onChangeText={(text) => form.setValue('statusMessage', text)}
                  />
                </View>
              </View>

              {/* 저장 버튼 */}
              <CustomButton
                onPress={form.handleSubmit(onSubmit)}
                label="저장하기"
                className="mt-4"
              />
            </View>
          </FormProvider>

          {/* 추가 정보 */}
          <View className="mt-6 bg-blue-50 p-4 rounded-xl">
            <View className="flex-row items-center mb-2">
              <MaterialIcons name="info" size={20} color="#3B82F6" />
              <Text className="ml-2 font-medium text-blue-600">
                프로필 수정 안내
              </Text>
            </View>
            <Text className="text-blue-600 text-sm">
              프로필 사진은 5MB 이하의 이미지 파일만 업로드 가능합니다.
              부적절한 프로필은 관리자에 의해 삭제될 수 있습니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 