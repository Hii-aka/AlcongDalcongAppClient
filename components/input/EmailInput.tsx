import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { COLORS } from '@/constants/theme';

export default function EmailInput() {
  const { register, setValue, formState: { errors }, watch } = useFormContext();
  const value = watch('email');

  React.useEffect(() => {
    register('email', {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 주소를 입력해주세요',
      },
    });
  }, [register]);

  const error = errors.email?.message as string | undefined;

  return (
    <View>
      <View className={`relative rounded-2xl overflow-hidden ${
        error ? 'bg-red-50' : 'bg-pink-50/30'
      }`}>
        <TextInput
          className={`w-full px-4 py-4 text-base ${
            error ? 'text-red-900' : 'text-gray-800'
          }`}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor={error ? '#EF4444' : '#9CA3AF'}
          onChangeText={(text) => setValue('email', text, { shouldValidate: true })}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          value={value}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-2 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
