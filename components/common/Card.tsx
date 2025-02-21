import React from 'react';
import { View, ViewProps } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps extends ViewProps {
  variant?: 'default' | 'outlined';
  children: React.ReactNode;
}

export function Card({ variant = 'default', style, children, ...props }: CardProps) {
  return (
    <View
      className={`
        rounded-2xl p-5 
        ${variant === 'default' ? 'bg-white/80' : 'bg-transparent'} 
        ${variant === 'outlined' ? 'border border-pink-100' : 'shadow-sm'}
      `}
      style={[
        variant === 'default' && theme.shadows.sm,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
} 