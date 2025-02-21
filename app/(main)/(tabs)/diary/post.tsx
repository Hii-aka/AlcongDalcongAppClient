import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Image, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';
import { Button } from '@/components/common/Button';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface ImageInfo {
  uri: string;
  width: number;
  height: number;
}

export default function DiaryPost() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY년 MM월 DD일');
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      if (Platform.OS === 'ios') {
        setTempDate(selectedDate);
      } else {
        setDate(selectedDate);
      }
    }
  };

  const handleIOSConfirm = () => {
    setDate(tempDate);
    setShowDatePicker(false);
  };

  const handleIOSCancel = () => {
    setTempDate(date);
    setShowDatePicker(false);
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('사진 접근 권한이 필요합니다.');
      return;
    }

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
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        <View className="flex-row items-center justify-between p-4 border-b border-pink-100">
          <Pressable 
            onPress={() => router.back()}
            className="p-2"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.love} />
          </Pressable>
          <Text className="text-xl font-bold text-gray-800">
            우리의 일기 작성
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-3xl shadow-sm p-6 border border-pink-100">
            <View className="space-y-6">
              <View>
                <View className="flex-row items-center mb-2">
                  <Ionicons name="pencil" size={20} color={COLORS.love} />
                  <Text className="text-base font-semibold text-gray-700 ml-2">
                    제목
                  </Text>
                </View>
                <TextInput
                  className="w-full border-2 border-pink-100 rounded-2xl px-4 py-3 text-gray-700"
                  placeholder="특별한 순간의 제목을 입력하세요"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View>
                <View className="flex-row items-center mb-2">
                  <View className="relative">
                    <Ionicons name="today-outline" size={20} color={COLORS.love} />
                    <View className="absolute -right-1 -top-1">
                      <Ionicons name="heart" size={10} color={COLORS.love} />
                    </View>
                  </View>
                  <Text className="text-base font-semibold text-gray-700 ml-2">
                    날짜
                  </Text>
                </View>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="w-full border-2 border-pink-100 rounded-2xl px-4 py-3 flex-row items-center justify-between"
                >
                  <Text className="text-gray-700">
                    {formatDate(date)}
                  </Text>
                  <Ionicons name="calendar" size={20} color={COLORS.love} />
                </Pressable>

                {Platform.OS === 'ios' ? (
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showDatePicker}
                    onRequestClose={handleIOSCancel}
                  >
                    <Pressable 
                      className="flex-1 justify-center items-center bg-black/30"
                      onPress={handleIOSCancel}
                    >
                      <Pressable 
                        className="bg-white rounded-3xl w-11/12 overflow-hidden"
                        onPress={(e) => e.stopPropagation()}
                        style={SHADOWS.medium}
                      >
                        <View className="flex-row items-center justify-between p-4 border-b border-pink-100">
                          <Pressable 
                            onPress={handleIOSCancel}
                            className="px-4 py-2"
                          >
                            <Text className="text-gray-500 font-medium">취소</Text>
                          </Pressable>
                          <Text className="text-base font-semibold text-gray-800">날짜 선택</Text>
                          <Pressable 
                            onPress={handleIOSConfirm}
                            className="px-4 py-2"
                          >
                            <Text className="text-pink-500 font-medium">완료</Text>
                          </Pressable>
                        </View>
                        <View className="p-4 items-center">
                          <DateTimePicker
                            value={tempDate}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                            locale="ko-KR"
                            style={{ height: 200 }}
                          />
                          <View className="absolute -top-1 -right-1">
                            <Ionicons name="heart" size={16} color={COLORS.love} />
                          </View>
                        </View>
                      </Pressable>
                    </Pressable>
                  </Modal>
                ) : (
                  showDatePicker && (
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={showDatePicker}
                      onRequestClose={() => setShowDatePicker(false)}
                    >
                      <Pressable 
                        className="flex-1 justify-center items-center bg-black/30"
                        onPress={() => setShowDatePicker(false)}
                      >
                        <View 
                          className="bg-white rounded-3xl p-4 w-11/12"
                          style={SHADOWS.medium}
                        >
                          <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                            locale="ko-KR"
                            style={{ height: 200 }}
                          />
                          <View className="absolute -top-1 -right-1">
                            <Ionicons name="heart" size={16} color={COLORS.love} />
                          </View>
                        </View>
                      </Pressable>
                    </Modal>
                  )
                )}
              </View>

              <View>
                <View className="flex-row items-center mb-2">
                  <View className="relative">
                    <Ionicons name="images-outline" size={20} color={COLORS.love} />
                    <View className="absolute -right-1 -top-1">
                      <Ionicons name="heart" size={10} color={COLORS.love} />
                    </View>
                  </View>
                  <Text className="text-base font-semibold text-gray-700 ml-2">
                    추억의 사진
                  </Text>
                </View>
                
                <View className="space-y-4">
                  {images.length > 0 && (
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      className="flex-row"
                      contentContainerStyle={{ gap: 8 }}
                    >
                      {images.map((image, index) => (
                        <View key={image.uri} className="relative">
                          <Image
                            source={{ uri: image.uri }}
                            className="w-24 h-24 rounded-2xl"
                          />
                          <Pressable
                            onPress={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-pink-500 rounded-full w-6 h-6 items-center justify-center"
                            style={SHADOWS.small}
                          >
                            <Ionicons name="close-outline" size={16} color="white" />
                          </Pressable>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                  
                  {images.length < 5 && (
                    <Pressable 
                      onPress={pickImage}
                      className="border-2 border-dashed border-pink-100 rounded-2xl p-6 items-center"
                    >
                      <View className="items-center">
                        <Ionicons name="images-outline" size={32} color={COLORS.love} />
                        <Text className="text-base text-gray-600 text-center mt-2">
                          소중한 추억을 선택해주세요
                        </Text>
                        <Text className="text-sm text-pink-400 text-center mt-1">
                          {images.length}/5장의 사진
                        </Text>
                      </View>
                    </Pressable>
                  )}
                </View>
              </View>

              <View>
                <View className="flex-row items-center mb-2">
                  <View className="relative">
                    <Ionicons name="heart-outline" size={20} color={COLORS.love} />
                    <View className="absolute -right-1 -top-1">
                      <Ionicons name="heart" size={10} color={COLORS.love} />
                    </View>
                  </View>
                  <Text className="text-base font-semibold text-gray-700 ml-2">
                    우리의 이야기
                  </Text>
                </View>
                <TextInput
                  className="w-full border-2 border-pink-100 rounded-2xl p-4 min-h-[200] text-gray-700"
                  multiline
                  numberOfLines={8}
                  placeholder="오늘 하루 서로에게 전하고 싶은 마음을 적어보세요..."
                  textAlignVertical="top"
                  value={content}
                  onChangeText={setContent}
                />
              </View>

              <Button
                title="추억 저장하기"
                onPress={handleSave}
                variant="love"
                size="large"
                icon="heart"
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
} 