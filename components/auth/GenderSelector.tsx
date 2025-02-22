import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '@/constants/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

type IconName = 'male' | 'female' | 'heart';

export default function GenderSelector() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const selectedGender = watch('gender');

  React.useEffect(() => {
    register('gender', {
      required: '성별을 선택해주세요',
    });
  }, [register]);

  const handleSelect = (gender: string) => {
    setValue('gender', gender, { shouldValidate: true });
  };

  const error = errors.gender?.message as string | undefined;

  const GenderOption = ({ value, label, icon }: { value: string; label: string; icon: IconName }) => (
    <Pressable
      onPress={() => handleSelect(value)}
      className={`flex-1 py-4 px-4 flex-row items-center justify-center space-x-2 relative
        ${selectedGender === value ? 'bg-pink-500/10' : error ? 'bg-red-50' : 'bg-pink-50/30'}
      `}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={
          selectedGender === value 
            ? COLORS.love 
            : error 
              ? '#EF4444' 
              : '#9CA3AF'
        } 
      />
      <Text className={`text-base font-medium ${
        selectedGender === value 
          ? 'text-pink-500' 
          : error 
            ? 'text-red-900' 
            : 'text-gray-600'
      }`}>
        {label}
      </Text>
      {selectedGender === value && (
        <Animated.View 
          entering={FadeIn.duration(200)}
          className="absolute -right-1 -top-1 bg-white rounded-full p-1.5"
          style={SHADOWS.small}
        >
          <Ionicons name="heart" size={14} color={COLORS.love} />
        </Animated.View>
      )}
    </Pressable>
  );

  return (
    <View>
      <View className="flex-row rounded-2xl overflow-hidden divide-x divide-pink-100">
        <GenderOption value="male" label="남성" icon="male" />
        <GenderOption value="female" label="여성" icon="female" />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-2 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}