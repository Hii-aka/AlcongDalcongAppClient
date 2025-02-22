import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

export default function PasswordConfirmInput() {
  const [isSecure, setIsSecure] = useState(true);
  const { register, setValue, watch } = useFormContext();
  const password = watch('password');

  React.useEffect(() => {
    register('passwordConfirm', {
      required: '비밀번호를 한번 더 입력해주세요',
      validate: (value: string) =>
        value === password || '비밀번호가 일치하지 않습니다',
    });
  }, [register, password]);

  return (
    <View className="relative">
      <TextInput
        className="w-full px-4 py-3 text-base text-gray-800"
        placeholder="비밀번호를 한번 더 입력해주세요"
        placeholderTextColor="#9CA3AF"
        secureTextEntry={isSecure}
        onChangeText={(text) => setValue('passwordConfirm', text, { shouldValidate: true })}
        returnKeyType="done"
        autoCapitalize="none"
      />
      <Pressable 
        className="absolute right-3 top-3"
        onPress={() => setIsSecure(!isSecure)}
      >
        <Ionicons
          name={isSecure ? 'eye-off' : 'eye'}
          size={24}
          color={COLORS.love}
        />
      </Pressable>
    </View>
  );
}   
