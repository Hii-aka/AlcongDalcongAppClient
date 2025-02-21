import React from 'react';
import { Pressable, Text, PressableProps, View } from 'react-native';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type ButtonContainerProps = PressableProps & Partial<LinearGradientProps>;

interface ButtonProps extends Omit<ButtonContainerProps, 'colors'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  label,
  isLoading,
  leftIcon,
  rightIcon,
  style,
  ...props 
}: ButtonProps) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: 'bg-gradient-to-r from-pink-500 to-rose-500',
          text: 'text-white font-semibold'
        };
      case 'secondary':
        return {
          container: 'bg-pink-50',
          text: 'text-pink-600 font-medium'
        };
      case 'outline':
        return {
          container: 'bg-transparent border border-pink-200',
          text: 'text-pink-600 font-medium'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4 text-sm';
      case 'md':
        return 'py-3 px-6 text-base';
      case 'lg':
        return 'py-4 px-8 text-lg';
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const ButtonContainer = variant === 'primary' ? AnimatedLinearGradient : AnimatedPressable;
  const containerProps = variant === 'primary' ? {
    colors: theme.gradients.accent as readonly [string, string],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 }
  } : {};

  return (
    <ButtonContainer
      className={`
        rounded-2xl items-center justify-center flex-row
        ${variantStyles.container}
        ${sizeStyles}
      `}
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...containerProps}
      {...props}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}
      <Text className={`${variantStyles.text} ${sizeStyles}`}>
        {isLoading ? '로딩중...' : label}
      </Text>
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </ButtonContainer>
  );
} 