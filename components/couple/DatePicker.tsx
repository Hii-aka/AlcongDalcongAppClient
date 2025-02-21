import React, { useState } from 'react';
import { View, Text, Pressable, Platform, Modal } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import DateTimePicker from '@react-native-community/datetimepicker';

// DatePickerModal 컴포넌트를 별도로 분리
interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  value: Date;
  onChange: (event: any, date?: Date) => void;
}

function DatePickerModal({ visible, onClose, onConfirm, value, onChange }: DatePickerModalProps) {
  if (Platform.OS === 'android') {
    return visible ? (
      <DateTimePicker
        value={value}
        mode="date"
        onChange={onChange}
        maximumDate={new Date()}
        locale="ko-KR"
      />
    ) : null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/30" onPress={onClose}>
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Pressable onPress={onClose}>
                <Text className="text-blue-500 text-base">취소</Text>
              </Pressable>
              <Text className="font-medium text-base">날짜 선택</Text>
              <Pressable onPress={onConfirm}>
                <Text className="text-blue-500 text-base">확인</Text>
              </Pressable>
            </View>
            <View className="items-center w-full">
              <DateTimePicker
                value={value}
                mode="date"
                display="spinner"
                onChange={onChange}
                maximumDate={new Date()}
                locale="ko-KR"
                className="h-72 w-full"
                themeVariant="light"
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

// 메인 DatePicker 컴포넌트
export default function DatePicker() {
  const [showPicker, setShowPicker] = useState(false);
  const { control, setValue, watch } = useFormContext();
  const selectedDate = watch('firstMetDate');
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (date) {
        setValue('firstMetDate', dayjs(date).format('YYYY-MM-DD'));
      }
    } else {
      setTempDate(date || null);
    }
  };

  const handlePress = () => {
    setTempDate(selectedDate ? new Date(selectedDate) : new Date());
    setShowPicker(true);
  };

  const handleConfirm = () => {
    const dateToSet = tempDate || new Date();
    setValue('firstMetDate', dayjs(dateToSet).format('YYYY-MM-DD'));
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTempDate(null);
    setShowPicker(false);
  };

  return (
    <Controller
      control={control}
      name="firstMetDate"
      rules={{
        required: '처음 만난 날을 입력해주세요.',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Text className="text-gray-600 font-medium mb-2">
            처음 만난 날
            <Text className="text-red-500">*</Text>
          </Text>
          <Pressable 
            className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
            onPress={handlePress}
          >
            <MaterialIcons name="calendar-today" size={20} color="#9CA3AF" />
            <Text className="flex-1 ml-2 text-base">
              {selectedDate ? dayjs(selectedDate).format('YYYY년 MM월 DD일') : '날짜를 선택하세요'}
            </Text>
          </Pressable>

          {Platform.OS === 'ios' ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showPicker}
              onRequestClose={handleCancel}
            >
              <Pressable 
                className="flex-1 justify-end bg-black/30"
                onPress={handleCancel}
              >
                <View className="bg-white rounded-t-2xl">
                  <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-200">
                    <Pressable onPress={handleCancel}>
                      <Text className="text-gray-500 font-medium">취소</Text>
                    </Pressable>
                    <Text className="font-semibold">처음 만난 날</Text>
                    <Pressable onPress={handleConfirm}>
                      <Text className="text-pink-500 font-medium">완료</Text>
                    </Pressable>
                  </View>
                  <View className="items-center justify-center py-2">
                    <DateTimePicker
                      value={tempDate || new Date()}
                      mode="date"
                      display="spinner"
                      onChange={handleDateChange}
                      locale="ko"
                      style={{ width: '100%', height: 200 }}
                      textColor="#000000"
                      maximumDate={new Date()}
                    />
                  </View>
                </View>
              </Pressable>
            </Modal>
          ) : (
            showPicker && (
              <DateTimePicker
                value={selectedDate ? new Date(selectedDate) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                locale="ko"
                maximumDate={new Date()}
              />
            )
          )}
          
          {Boolean(error) && (
            <Text className="text-red-500 text-sm mt-1">{error?.message}</Text>
          )}
        </View>
      )}
    />
  );
}