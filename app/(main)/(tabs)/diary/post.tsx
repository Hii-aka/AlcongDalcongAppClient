import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

interface ImageInfo {
  uri: string;
  width: number;
  height: number;
}

export default function DiaryPost() {
  const [images, setImages] = useState<ImageInfo[]>([]);

  const pickImage = async () => {
    // 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('사진 접근 권한이 필요합니다.');
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
      }));
      
      if (images.length + newImages.length > 5) {
        alert('최대 5장까지만 선택 가능합니다.');
        return;
      }
      
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // TODO: 일기 저장 로직 구현
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold">일기 작성하기</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                제목
              </Text>
              <TextInput
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="일기 제목을 입력하세요"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                날짜
              </Text>
              <TextInput
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-3">
                사진 추가
              </Text>
              <View className="space-y-4">
                {images.length > 0 && (
                  <View className="flex-row flex-wrap gap-2">
                    {images.map((image, index) => (
                      <View key={image.uri} className="relative">
                        <Image
                          source={{ uri: image.uri }}
                          className="w-20 h-20 rounded-lg"
                        />
                        <Pressable
                          onPress={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-1"
                        >
                          <FontAwesome name="times" size={12} color="white" />
                        </Pressable>
                      </View>
                    ))}
                  </View>
                )}
                
                {images.length < 5 && (
                  <Pressable 
                    onPress={pickImage}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 items-center"
                  >
                    <View className="space-y-2 items-center">
                      <FontAwesome name="camera" size={24} color="#9CA3AF" />
                      <Text className="text-sm text-gray-500 text-center">
                        이미지를 선택하여 업로드
                      </Text>
                      <Text className="text-xs text-gray-400 text-center">
                        {images.length}/5장 업로드됨
                      </Text>
                    </View>
                  </Pressable>
                )}
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                일기 내용
              </Text>
              <TextInput
                className="w-full border border-gray-200 rounded-lg px-3 py-2 h-48"
                multiline
                numberOfLines={8}
                placeholder="오늘 하루를 기록해보세요"
                textAlignVertical="top"
              />
            </View>

            <Pressable 
              className="w-full bg-custom py-3 rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-white text-center font-medium">
                일기 저장하기
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-sm p-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold">최근 일기</Text>
          </View>
          
          <View className="border border-gray-200 rounded-lg p-4">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="font-medium">행복했던 데이트</Text>
                <Text className="text-sm text-gray-500 mt-1">
                  2024년 2월 14일
                </Text>
                <Text className="text-sm text-gray-500">
                  오늘 롯데월드에서 정말 즐거운 시간을 보냈어요...
                </Text>
              </View>
              <Pressable className="px-2">
                <FontAwesome name="ellipsis-v" size={16} color="#9CA3AF" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 