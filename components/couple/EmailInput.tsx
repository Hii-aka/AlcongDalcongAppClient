import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Controller, useFormContext } from 'react-hook-form';
import regax from '@/constants/regax';
import { Profile } from '@/types';

interface EmailInputProps {
  isConnected?: boolean;
  partner?: Profile | null;
}

export default function EmailInput({isConnected = false, partner = null}: EmailInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="receiverEmail"
      rules={{
        required: '상대방 이메일을 입력해주세요.',
        pattern: {
          value: regax.EMAIL,
          message: '올바른 이메일 형식을 입력해주세요.',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Text className="text-gray-600 font-medium mb-2">
            상대방 이메일
          <Text className="text-red-500">*</Text>
      </Text>
      <Pressable 
        className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
      >
        <MaterialIcons name="email" size={20} color="#9CA3AF" />
        <TextInput
          editable={!isConnected}
          placeholder={isConnected ? partner?.email : "상대방의 이메일을 입력하세요"}
          className="flex-1 ml-2 text-base"
          onChangeText={onChange}
          value={value}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
        />
      </Pressable>
        {Boolean(error) && <Text className="text-red-500">{error?.message}</Text>}
        </View>
      )}
    />
  );
}
