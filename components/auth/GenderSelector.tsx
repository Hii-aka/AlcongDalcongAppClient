import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

type IconName = 'male' | 'female' | 'heart';

export default function GenderSelector() {
  const { register, setValue, watch } = useFormContext();
  const selectedGender = watch('gender');

  React.useEffect(() => {
    register('gender', {
      required: '성별을 선택해주세요',
    });
  }, [register]);

  const handleSelect = (gender: string) => {
    setValue('gender', gender, { shouldValidate: true });
  };

  const GenderOption = ({ value, label, icon }: { value: string; label: string; icon: IconName }) => (
    <Pressable
      onPress={() => handleSelect(value)}
      className={`flex-1 py-4 px-4 flex-row items-center justify-center space-x-2 ${
        selectedGender === value ? 'bg-pink-500/10' : 'bg-pink-50/30'
      }`}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={selectedGender === value ? COLORS.love : '#9CA3AF'} 
      />
      <Text className={`text-base font-medium ${
        selectedGender === value ? 'text-pink-500' : 'text-gray-600'
      }`}>
        {label}
      </Text>
      {selectedGender === value && (
        <Animated.View 
          entering={FadeIn.duration(200)}
          className="absolute -top-1 -right-1"
        >
          <View className="bg-white rounded-full p-1">
            <Ionicons name="heart" size={12} color={COLORS.love} />
          </View>
        </Animated.View>
      )}
    </Pressable>
  );

  return (
    <View className="flex-row rounded-2xl overflow-hidden divide-x divide-pink-100">
      <GenderOption value="male" label="남성" icon="male" />
      <GenderOption value="female" label="여성" icon="female" />
    </View>
  );
}