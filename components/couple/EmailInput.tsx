import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFormContext } from 'react-hook-form';

export default function EmailInput() {
  const { register, setValue, watch } = useFormContext();

  return (
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
          placeholder="상대방의 이메일을 입력하세요"
          className="flex-1 ml-2 text-base"
          onChangeText={(text) => setValue('receiverEmail', text)}
          value={watch('receiverEmail')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
        />
      </Pressable>
    </View>
  );
}
