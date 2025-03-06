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
import { formatDate, formatTime, formatDateTime, formatDateWithSeparator } from '@/utils';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import useCreateDateCalendar from '@/hooks/queries/useCreateDateCalendar';
import useSearchLocationStore from '@/store/useSearchLocationStore';
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
  const createDateCalendar = useCreateDateCalendar();
  const {location} = useSearchLocationStore();
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setDate(selectedDate);
      }
    } else if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      if (event.type === 'set' && selectedTime) {
        setTime(selectedTime);
      }
    } else if (selectedTime) {
      setTempTime(selectedTime);
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
    createDateCalendar.mutate({
      title,
      date: formatDateWithSeparator(tempDate),
      time: formatTime(tempTime),
      location: location?.place_name || '',
      description: memo,
    });
    router.back();
  };

  const renderPicker = (type: 'date' | 'time') => {
    const isDate = type === 'date';
    const visible = isDate ? showDatePicker : showTimePicker;
    const value = isDate ? (Platform.OS === 'ios' ? tempDate : date) : (Platform.OS === 'ios' ? tempTime : time);
    const onChange = isDate ? handleDateChange : handleTimeChange;

    if (Platform.OS === 'android') {
      return visible ? (
        <DateTimePicker
          value={value}
          mode={type}
          onChange={onChange}
          locale="ko-KR"
        />
      ) : null;
    }

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
          <Animated.View 
            entering={FadeInDown.duration(300)}
            className="bg-white rounded-3xl w-11/12 overflow-hidden"
            style={SHADOWS.medium}
          >
            <LinearGradient
              colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
              className="px-6 py-4 items-center justify-center"
            >
              <Text className="text-lg font-bold text-white">
                {isDate ? '날짜 선택' : '시간 선택'}
              </Text>
              <View className="absolute right-4 top-4">
                <Ionicons name="heart" size={20} color="white" />
              </View>
            </LinearGradient>

            <View className="p-6">
              <DateTimePicker
                value={value}
                mode={type}
                display="spinner"
                onChange={onChange}
                locale="ko-KR"
                style={{ height: 200 }}
              />
            </View>

            <View className="flex-row border-t border-pink-100">
              <Pressable 
                className="flex-1 p-4"
                onPress={() => handleIOSCancel(type)}
              >
                <Text className="text-center text-gray-500 font-medium">
                  취소
                </Text>
              </Pressable>
              <Pressable 
                className="flex-1 p-4 bg-pink-50"
                onPress={() => handleIOSConfirm(type)}
              >
                <Text className="text-center text-pink-500 font-bold">
                  선택 완료
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background] as readonly [string, string]}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 헤더 */}
          <Animated.View 
            entering={FadeInDown.duration(300)}
            className="flex-row items-center justify-between mb-6"
          >
            <Pressable 
              className="w-10 h-10 items-center justify-center rounded-full bg-white"
              style={SHADOWS.small}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.love} />
            </Pressable>
            <Text className="text-xl font-bold text-gray-800">
              새로운 데이트 일정
            </Text>
            <View className="w-10" />
          </Animated.View>

          {/* 메인 폼 */}
          <Animated.View 
            entering={FadeInDown.delay(150).duration(300)}
            className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden"
          >
            <LinearGradient
              colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
              className="px-6 py-3"
            >
              <Text className="text-white font-medium text-center">
                우리의 특별한 날
              </Text>
              <View className="absolute right-4 top-3">
                <Ionicons name="heart" size={20} color="white" />
              </View>
            </LinearGradient>
            
            <View className="p-6 space-y-6">
              {/* 제목 입력 */}
              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2 flex-row items-center">
                  <Ionicons name="heart" size={16} color={COLORS.love} className="mr-2" />
                  어떤 데이트인가요?
                </Text>
                <View 
                  className="bg-pink-50/30 rounded-2xl overflow-hidden"
                  style={SHADOWS.small}
                >
                  <TextInput
                    className="px-4 py-3 text-base text-gray-800"
                    placeholder="데이트 제목을 입력해주세요"
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* 날짜/시간 선택 */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-700 mb-2">
                    <Ionicons name="calendar" size={16} color={COLORS.love} className="mr-2" />
                    날짜
                  </Text>
                  <Pressable 
                    className="bg-pink-50/30 rounded-2xl px-4 py-3"
                    style={SHADOWS.small}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text className="text-gray-800">{formatDate(date)}</Text>
                  </Pressable>
                </View>
                
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-700 mb-2">
                    <Ionicons name="time" size={16} color={COLORS.love} className="mr-2" />
                    시간
                  </Text>
                  <Pressable 
                    className="bg-pink-50/30 rounded-2xl px-4 py-3"
                    style={SHADOWS.small}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text className="text-gray-800">{formatTime(time)}</Text>
                  </Pressable>
                </View>
              </View>

              {/* 장소 선택 */}
              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  <Ionicons name="location" size={16} color={COLORS.love} className="mr-2" />
                  어디서 만날까요?
                </Text>
                <SearchLocationScreen />
              </View>

              {/* 메모 입력 */}
              <View>
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  <Ionicons name="document-text" size={16} color={COLORS.love} className="mr-2" />
                  메모하기
                </Text>
                <View 
                  className="bg-pink-50/30 rounded-2xl overflow-hidden"
                  style={SHADOWS.small}
                >
                  <TextInput
                    className="px-4 py-3 h-24 text-base text-gray-800"
                    multiline
                    numberOfLines={4}
                    placeholder="데이트 계획을 자유롭게 메모해보세요"
                    textAlignVertical="top"
                    value={memo}
                    onChangeText={setMemo}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* 저장 버튼 */}
              <Pressable 
                className="overflow-hidden rounded-2xl mt-4"
                style={SHADOWS.medium}
                onPress={handleSave}
              >
                <LinearGradient
                  colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
                  className="py-4 px-6"
                >
                  <View className="flex-row items-center justify-center space-x-2">
                    <Ionicons name="heart" size={20} color="white" />
                    <Text className="text-white text-base font-bold">
                      데이트 일정 추가하기
                    </Text>
                  </View>
                </LinearGradient>
              </Pressable>
            </View>
          </Animated.View>

          {/* 다가오는 데이트 섹션 */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(300)}
            className="mt-6 bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden"
          >
            <LinearGradient
              colors={[COLORS.love, COLORS.primary] as readonly [string, string]}
              className="px-6 py-3"
            >
              <Text className="text-white font-medium text-center">
                다가오는 데이트
              </Text>
              <View className="absolute right-4 top-3">
                <Ionicons name="heart" size={20} color="white" />
              </View>
            </LinearGradient>
            
            <View className="p-6">
              <View className="bg-pink-50/30 rounded-2xl p-4">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="font-bold text-gray-800 text-lg">
                      롯데월드 데이트
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <Ionicons name="calendar" size={14} color={COLORS.love} />
                      <Text className="text-gray-600 ml-2">
                        {formatDateTime(new Date('2024-02-14 14:00'))}
                      </Text>
                    </View>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="location" size={14} color={COLORS.love} />
                      <Text className="text-gray-600 ml-2">
                        잠실역 2번 출구
                      </Text>
                    </View>
                  </View>
                  <View className="bg-white rounded-full p-2">
                    <Ionicons name="heart" size={24} color={COLORS.love} />
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        {renderPicker('date')}
        {renderPicker('time')}
      </LinearGradient>
    </SafeAreaView>
  );
} 