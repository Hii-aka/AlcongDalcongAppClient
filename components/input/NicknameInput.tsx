import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { COLORS } from '@/constants/theme';

export default function NicknameInput() {
  const { register, setValue, formState: { errors }, watch } = useFormContext();
  const value = watch('nickname');

  React.useEffect(() => {
    register('nickname', {
      required: '닉네임을 입력해주세요',
      minLength: {
        value: 2,
        message: '닉네임은 2자 이상이어야 합니다',
      },
      maxLength: {
        value: 10,
        message: '닉네임은 10자 이하여야 합니다',
      },
      pattern: {
        value: /^[가-힣a-zA-Z][가-힣a-zA-Z0-9]*$/,
        message: '닉네임은 한글/영문으로 시작하고 숫자를 포함할 수 있습니다',
      }
    });
  }, [register]);

  const error = errors.nickname?.message as string | undefined;

  return (
    <View>
      <View className={`relative rounded-2xl overflow-hidden ${
        error ? 'bg-red-50' : 'bg-pink-50/30'
      }`}>
        <TextInput
          className={`w-full px-4 py-4 text-base ${
            error ? 'text-red-900' : 'text-gray-800'
          }`}
          placeholder="닉네임을 입력해주세요"
          placeholderTextColor={error ? '#EF4444' : '#9CA3AF'}
          onChangeText={(text) => setValue('nickname', text, { shouldValidate: true })}
          returnKeyType="next"
          maxLength={10}
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
