import React from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

function EmailInput() {
    const {control, setFocus} = useFormContext();   
  return (
    <Controller
        control={control}
        name="receiverEmail"
        rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식이 올바르지 않습니다.',
            },
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
            <View>
            <Text className="text-gray-600 font-medium mb-2">
              상대방 이메일
              <Text className="text-red-500"> *</Text>
            </Text>
            <Pressable 
              className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 active:bg-gray-100"
              onPress={() => {/* 포커스 효과 */}}
            >
              <MaterialIcons name="email" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="상대방의 이메일을 입력하세요"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 ml-2 text-base"
                value={value}
                onChangeText={onChange}
                returnKeyType="next"
              />
              {Boolean(error) && (
                  <Text className="text-red-500 text-sm">{error?.message}</Text>
              )}
            </Pressable>
          </View>
        )}
    />
  )
}


export default EmailInput;
