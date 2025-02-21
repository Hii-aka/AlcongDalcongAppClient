import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function CustomButton({ 
  onPress, 
  label, 
  disabled = false,
  className = '',
  children
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`
        flex-row items-center justify-center
        py-4 px-6 rounded-xl
        ${disabled ? 'bg-gray-300' : 'bg-pink-500'}
        ${className}
      `}
    >
      <Text className={`
        font-semibold text-base
        ${disabled ? 'text-gray-500' : 'text-white'}
      `}>
        {label}
      </Text>
      {children && <View className="ml-2">{children}</View>}
    </TouchableOpacity>
  );
}