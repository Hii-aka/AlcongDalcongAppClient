import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

interface PasswordInputProps {
  submitBehavior?: 'submit' | 'next';
}

export default function PasswordInput({ submitBehavior = 'next' }: PasswordInputProps) {
  const [isSecure, setIsSecure] = useState(true);
  const { register, setValue, formState: { errors }, watch } = useFormContext();
  const value = watch('password');

  React.useEffect(() => {
    register('password', {
      required: '비밀번호를 입력해주세요',
      minLength: {
        value: 8,
        message: '비밀번호는 8자 이상이어야 합니다',
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: '영문, 숫자, 특수문자를 포함해야 합니다',
      }
    });
  }, [register]);

  const error = errors.password?.message as string | undefined;

  return (
    <View>
      <View className={`relative rounded-2xl overflow-hidden ${
        error ? 'bg-red-50' : 'bg-pink-50/30'
      }`}>
        <TextInput
          className={`w-full px-4 py-4 text-base ${
            error ? 'text-red-900' : 'text-gray-800'
          }`}
          placeholder="비밀번호를 입력해주세요"
          placeholderTextColor={error ? '#EF4444' : '#9CA3AF'}
          secureTextEntry={isSecure}
          onChangeText={(text) => setValue('password', text, { shouldValidate: true })}
          returnKeyType={submitBehavior === 'submit' ? 'done' : 'next'}
          autoCapitalize="none"
          value={value}
        />
        <Pressable 
          className="absolute right-3 top-4"
          onPress={() => setIsSecure(!isSecure)}
        >
          <Ionicons
            name={isSecure ? 'eye-off' : 'eye'}
            size={20}
            color={error ? '#EF4444' : COLORS.love}
          />
        </Pressable>
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-2 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
