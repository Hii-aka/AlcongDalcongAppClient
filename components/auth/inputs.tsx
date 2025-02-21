import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

type ReturnKeyType = 'done' | 'go' | 'next' | 'search' | 'send';

interface CustomInputProps {
  name?: string;
  label?: string;
  placeholder?: string;
  submitBehavior?: ReturnKeyType;
}

type InputProps = Omit<TextInputProps, 'ref' | 'returnKeyType'> & CustomInputProps;

const BaseInput = React.forwardRef<TextInput, InputProps>(
  ({ name = '', label, submitBehavior = 'next', ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string;

    return (
      <View className="space-y-2">
        {label && (
          <Text className="text-gray-700 font-medium">{label}</Text>
        )}
        <TextInput
          {...register(name)}
          {...props}
          ref={ref}
          className={`
            w-full bg-pink-50/30 rounded-xl px-4 py-3 
            border ${error ? 'border-red-400' : 'border-pink-100'}
            text-gray-800
          `}
          placeholderTextColor={theme.colors.gray[400]}
          autoCapitalize="none"
          returnKeyType={submitBehavior}
        />
        {error && (
          <Text className="text-red-500 text-sm ml-1">{error}</Text>
        )}
      </View>
    );
  }
);

export function EmailInput() {
  return (
    <BaseInput
      name="email"
      label="이메일"
      placeholder="이메일을 입력해주세요"
      keyboardType="email-address"
      autoComplete="email"
      textContentType="emailAddress"
      submitBehavior="next"
    />
  );
}

export function PasswordInput({ 
  name = 'password',
  placeholder = '비밀번호를 입력해주세요',
  submitBehavior = 'done'
}: CustomInputProps) {
  return (
    <BaseInput
      name={name}
      label="비밀번호"
      placeholder={placeholder}
      secureTextEntry
      autoComplete="password"
      textContentType="password"
      submitBehavior={submitBehavior}
    />
  );
}

export function NicknameInput() {
  return (
    <BaseInput
      name="nickname"
      label="닉네임"
      placeholder="닉네임을 입력해주세요"
      autoComplete="username"
      textContentType="username"
      submitBehavior="next"
    />
  );
} 