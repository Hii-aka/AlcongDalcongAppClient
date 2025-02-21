import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Controller, useFormContext } from 'react-hook-form';

type Gender = 'MALE' | 'FEMALE';

function GenderSelect() {
  const { control } = useFormContext();

  const genderOptions: { value: Gender; label: string; icon: string; subIcon: string }[] = [
    { 
      value: 'MALE', 
      label: '남성', 
      icon: 'face-man',
      subIcon: 'mars'  // ♂ 심볼
    },
    { 
      value: 'FEMALE', 
      label: '여성', 
      icon: 'face-woman',
      subIcon: 'venus'  // ♀ 심볼
    }
  ];

  return (
    <Controller
      control={control}
      name="gender"
      rules={{ required: '성별을 선택해주세요 💝' }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View>
          <Text className="text-gray-600 font-medium mb-3 text-center">
            당신의 성별을 알려주세요
            <Text className="text-rose-400"> 💖</Text>
          </Text>
          
          <View className="flex-row space-x-4 px-1">
            {genderOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => onChange(option.value)}
                className={`flex-1 items-center justify-center py-5 rounded-3xl border ${
                  value === option.value
                    ? 'bg-rose-50 border-rose-300'
                    : 'bg-gray-50/80 border-gray-200'
                }`}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    shadowColor: value === option.value ? '#FEE2E2' : '#E5E7EB',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: value === option.value ? 3 : 1,
                  }
                ]}
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={32}
                  color={value === option.value ? '#FB7185' : '#9CA3AF'}
                />
                <View className="flex-row items-center mt-2">
                  <Text
                    className={`font-medium text-base ${
                      value === option.value ? 'text-rose-500' : 'text-gray-500'
                    }`}
                  >
                    {option.label}
                  </Text>
                  <FontAwesome5 
                    name={option.subIcon}
                    size={12}
                    color={value === option.value ? '#FB7185' : '#9CA3AF'}
                    style={{ marginLeft: 4, marginTop: 2 }}
                  />
                </View>
              </Pressable>
            ))}
          </View>
          
          {error && (
            <Text className="text-rose-400 text-sm mt-3 text-center">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

export default GenderSelect;