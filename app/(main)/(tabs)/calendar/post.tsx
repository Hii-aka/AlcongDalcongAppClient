import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '@/constants/theme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import SearchLocationScreen from '@/components/date/SearchLocationScreen';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { formatDate, formatTime, formatDateTime } from '@/utils';

dayjs.locale('ko');

export default function CalendarPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [memo, setMemo] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());

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

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      if (Platform.OS === 'ios') {
        setTempTime(selectedTime);
      } else {
        setTime(selectedTime);
      }
    }
  };

  const handleIOSConfirm = (type: 'date' | 'time') => {
    if (type === 'date') {
      setDate(tempDate);
      setShowDatePicker(false);
    } else {
      setTime(tempTime);
      setShowTimePicker(false);
    }
  };

  const handleIOSCancel = (type: 'date' | 'time') => {
    if (type === 'date') {
      setTempDate(date);
      setShowDatePicker(false);
    } else {
      setTempTime(time);
      setShowTimePicker(false);
    }
  };

  const handleSave = () => {
    // TODO: 일정 저장 로직 구현
    router.back();
  };

  const renderPicker = (type: 'date' | 'time') => {
    const isDate = type === 'date';
    const visible = isDate ? showDatePicker : showTimePicker;
    const value = isDate ? (Platform.OS === 'ios' ? tempDate : date) : (Platform.OS === 'ios' ? tempTime : time);
    const onChange = isDate ? handleDateChange : handleTimeChange;

    if (!visible) return null;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => handleIOSCancel(type)}
      >
        <Pressable 
          className="flex-1 justify-center items-center bg-black/30"
          onPress={() => handleIOSCancel(type)}
        >
          <Pressable 
            className="bg-white rounded-3xl w-11/12 overflow-hidden"
            onPress={(e) => e.stopPropagation()}
            style={SHADOWS.medium}
          >
            <View className="flex-row items-center justify-between p-4 border-b border-pink-100">
              <Pressable 
                onPress={() => handleIOSCancel(type)}
                className="px-4 py-2"
              >
                <Text className="text-gray-500 font-medium">취소</Text>
              </Pressable>
              <Text className="text-base font-semibold text-gray-800">
                {isDate ? '날짜 선택' : '시간 선택'}
              </Text>
              <Pressable 
                onPress={() => handleIOSConfirm(type)}
                className="px-4 py-2"
              >
                <Text className="text-pink-500 font-medium">완료</Text>
              </Pressable>
            </View>
            <View className="p-4 items-center">
              <DateTimePicker
                value={value}
                mode={type}
                display="spinner"
                onChange={onChange}
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
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ position: 'relative' }}>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-white rounded-2xl shadow-sm p-5 mb-4 border border-pink-100">
          <View className="flex-row items-center mb-6">
            <Ionicons name="heart" size={20} color={COLORS.love} />
            <Text className="text-xl font-bold ml-2 text-gray-800">
              새로운 데이트 일정
            </Text>
          </View>
          
          <View className="space-y-5">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                <Ionicons name="pencil" size={12} color={COLORS.love} className="mr-1" />
                {" "}어떤 데이트인가요?
              </Text>
              <TextInput
                className="w-full border border-pink-100 rounded-xl px-4 py-3 bg-pink-50/30"
                placeholder="데이트 제목을 입력해주세요"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                  <Ionicons name="calendar" size={12} color={COLORS.love} className="mr-1" />
                  {" "}날짜
                </Text>
                <Pressable 
                  className="border border-pink-100 rounded-xl px-4 py-3 bg-pink-50/30"
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text className="text-gray-600">{formatDate(date)}</Text>
                </Pressable>
              </View>
              
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                  <Ionicons name="time" size={12} color={COLORS.love} className="mr-1" />
                  {" "}시간
                </Text>
                <Pressable 
                  className="border border-pink-100 rounded-xl px-4 py-3 bg-pink-50/30"
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text className="text-gray-600">{formatTime(time)}</Text>
                </Pressable>
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                <Ionicons name="location" size={12} color={COLORS.love} className="mr-1" />
                {" "}어디서 만날까요?
              </Text>
              <SearchLocationScreen />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2 flex-row items-center">
                <Ionicons name="document-text" size={12} color={COLORS.love} className="mr-1" />
                {" "}메모하기
              </Text>
              <TextInput
                className="w-full border border-pink-100 rounded-xl px-4 py-3 h-24 bg-pink-50/30"
                multiline
                numberOfLines={4}
                placeholder="데이트 계획을 자유롭게 메모해보세요"
                textAlignVertical="top"
                value={memo}
                onChangeText={setMemo}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <Pressable 
              className="w-full bg-pink-500 py-4 rounded-xl mt-4 flex-row items-center justify-center space-x-2"
              onPress={handleSave}
            >
              <Ionicons name="heart" size={16} color="white" />
              <Text className="text-white text-base font-semibold">
                데이트 일정 추가하기
              </Text>
            </Pressable>
          </View>
        </View>

        {renderPicker('date')}
        {renderPicker('time')}

        <View className="bg-white rounded-2xl shadow-sm p-5 border border-pink-100">
          <View className="flex-row items-center mb-4">
            <Ionicons name="calendar" size={20} color={COLORS.love} />
            <Text className="text-xl font-bold ml-2 text-gray-800">다가오는 데이트</Text>
          </View>
          
          <View className="border border-pink-100 rounded-xl p-4 bg-pink-50/30">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="font-semibold text-gray-800 text-base">롯데월드 데이트</Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="calendar" size={12} color={COLORS.love} />
                  <Text className="text-sm text-gray-600 ml-2">
                    {formatDateTime(new Date('2024-02-14 14:00'))}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="location" size={12} color={COLORS.love} />
                  <Text className="text-sm text-gray-600 ml-2">
                    잠실역 2번 출구
                  </Text>
                </View>
              </View>
              <Ionicons name="heart" size={20} color={COLORS.love} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 