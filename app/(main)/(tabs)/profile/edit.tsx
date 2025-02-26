import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { FormProvider, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import useAuth from '@/hooks/queries/useAuth';
import { ProfileWithCouple } from '@/types';

type ProfileForm = {
  nickname: string;
  statusMessage: string;
};

export default function ProfileEdit() {
  const { getMeQuery } = useAuth();
  const { data: {user, partner} } = getMeQuery as { data: ProfileWithCouple};
  const [profileImage, setProfileImage] = useState<string | null>(
    user.profileImage || require('@/assets/images/default-profile.png')
  );

  const form = useForm<ProfileForm>({
    defaultValues: {
      nickname: user.nickname || '',
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
    Alert.alert('성공', '프로필이 성공적으로 업데이트되었습니다.', [
      { text: '확인', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        {/* 헤더 */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="p-2 bg-white rounded-full"
            style={SHADOWS.small}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.love} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">프로필 수정</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1">
          <Animated.View 
            entering={FadeInDown.duration(600)}
            className="p-6"
          >
            {/* 프로필 이미지 섹션 */}
            <View className="items-center mb-8">
              <View className="relative">
                <LinearGradient
                  colors={[COLORS.love, COLORS.primary]}
                  className="p-1 rounded-full"
                  style={SHADOWS.medium}
                >
                  <View className="bg-white p-1 rounded-full">
                    <Image
                      source={ require('@/assets/images/default-profile.png') }
                      className="w-32 h-32 rounded-full"
                    />
                  </View>
                </LinearGradient>
                <TouchableOpacity
                  onPress={pickImage}
                  className="absolute bottom-0 right-0 bg-white p-3 rounded-full shadow-lg border border-pink-100"
                  style={SHADOWS.medium}
                >
                  <Ionicons name="camera" size={24} color={COLORS.love} />
                </TouchableOpacity>
              </View>
            </View>

            {/* 프로필 정보 폼 */}
            <FormProvider {...form}>
              <View className="space-y-6">
                {/* 닉네임 입력 */}
                <Animated.View 
                  entering={FadeInDown.delay(200).duration(600)}
                  className="space-y-2"
                >
                  <Text className="text-base font-semibold text-gray-700 ml-1">닉네임</Text>
                  <View 
                    className="bg-white rounded-2xl px-4 py-4 border border-pink-100"
                    style={SHADOWS.small}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="person" size={20} color={COLORS.love} />
                      <TextInput
                        placeholder="닉네임을 입력하세요"
                        className="flex-1 ml-3 text-base text-gray-800"
                        defaultValue={form.getValues('nickname')}
                        onChangeText={(text) => form.setValue('nickname', text)}
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  </View>
                </Animated.View>

                {/* 상태 메시지 입력 */}
                <Animated.View 
                  entering={FadeInDown.delay(400).duration(600)}
                  className="space-y-2"
                >
                  <Text className="text-base font-semibold text-gray-700 ml-1">상태 메시지</Text>
                  <View 
                    className="bg-white rounded-2xl px-4 py-4 border border-pink-100"
                    style={SHADOWS.small}
                  >
                    <View className="flex-row items-start">
                      <Ionicons name="heart" size={20} color={COLORS.love} />
                      <TextInput
                        placeholder="상태 메시지를 입력하세요"
                        className="flex-1 ml-3 text-base text-gray-800"
                        multiline
                        numberOfLines={3}
                        defaultValue={form.getValues('statusMessage')}
                        onChangeText={(text) => form.setValue('statusMessage', text)}
                        placeholderTextColor="#9CA3AF"
                        textAlignVertical="top"
                      />
                    </View>
                  </View>
                </Animated.View>

                {/* 저장 버튼 */}
                <Animated.View entering={FadeInDown.delay(600).duration(600)}>
                  <TouchableOpacity
                    onPress={form.handleSubmit(onSubmit)}
                    className="mt-6"
                    style={SHADOWS.medium}
                  >
                    <LinearGradient
                      colors={[COLORS.love, COLORS.primary]}
                      className="py-4 rounded-2xl"
                    >
                      <Text className="text-white text-center font-bold text-lg">
                        저장하기
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>

                {/* 추가 정보 */}
                <Animated.View 
                  entering={FadeInDown.delay(800).duration(600)}
                  className="mt-8 bg-white p-6 rounded-2xl border border-pink-100"
                  style={SHADOWS.small}
                >
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="information-circle" size={24} color={COLORS.love} />
                    <Text className="ml-2 font-bold text-gray-800 text-lg">
                      프로필 수정 안내
                    </Text>
                  </View>
                  <Text className="text-gray-600 text-base leading-relaxed">
                    • 프로필 사진은 5MB 이하의 이미지 파일만 업로드 가능합니다.{'\n'}
                    • 부적절한 프로필은 관리자에 의해 삭제될 수 있습니다.
                  </Text>
                </Animated.View>
              </View>
            </FormProvider>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
} 