import { View, Text, Pressable, Platform, Modal } from "react-native";
import { useState } from "react";
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
function DatePicker() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { control, setValue, watch } = useFormContext();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dayjs(dateString).format('YYYY년 M월 D일');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      setValue('firstMetDate', formattedDate);
    }
  };

  const handleConfirm = () => {
    if (!watch('firstMetDate')) {
      const today = dayjs().format('YYYY-MM-DD');
      setValue('firstMetDate', today);
    }
    setShowDatePicker(false);
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
            <Text className="text-red-500"> *</Text>
          </Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 active:bg-gray-100"
            style={({ pressed }) => [
              pressed && { backgroundColor: '#F3F4F6' }
            ]}
          >
            <MaterialIcons name="event" size={20} color="#9CA3AF" />
            <Text className="flex-1 ml-2 text-base text-gray-700">
              {watch('firstMetDate') 
                ? formatDate(watch('firstMetDate')) 
                : '날짜를 선택해주세요'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#9CA3AF" />
          </Pressable>

          <DatePickerModal
            visible={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onConfirm={handleConfirm}
            value={watch('firstMetDate') 
              ? new Date(watch('firstMetDate')) 
              : new Date()}
            onChange={handleDateChange}
          />
          
          {Boolean(error) && (
            <Text className="text-red-500 text-sm mt-1">{error?.message}</Text>
          )}
        </View>
      )}
    />
  );
}

export default DatePicker;