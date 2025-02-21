import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS, BUTTON_STYLES, TYPOGRAPHY, SPACING } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'love';
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
}: ButtonProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return ['#FF7595', '#FF5983'];
      case 'secondary':
        return ['#A575FF', '#9359FF'];
      case 'love':
        return ['#FF91AA', '#FF7595'];
      default:
        return undefined;
    }
  };

  const gradientColors = getGradientColors();
  const ButtonContainer = gradientColors ? LinearGradient : View;
  const containerProps = gradientColors
    ? {
        colors: gradientColors,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      }
    : {};

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : COLORS.background}
        />
      );
    }

    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    const iconColor = variant === 'outline' ? COLORS.primary : COLORS.background;
    
    return (
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && (
          <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.iconLeft} />
        )}
        <Text style={[
          styles.text,
          styles[`${variant}Text`],
          styles[`${size}Text`],
          disabled && styles.disabledText,
        ]}>
          {title}
        </Text>
        {icon && iconPosition === 'right' && (
          <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.iconRight} />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={styles.touchable}
    >
      <ButtonContainer
        style={[
          styles.button,
          styles[variant],
          styles[size],
          disabled && styles.disabled,
        ]}
        {...containerProps}
      >
        {renderContent()}
      </ButtonContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: BUTTON_STYLES.borderRadius,
    overflow: 'hidden',
  },
  button: {
    ...BUTTON_STYLES,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  love: {
    backgroundColor: COLORS.love,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.background,
  },
  secondaryText: {
    color: COLORS.background,
  },
  outlineText: {
    color: COLORS.primary,
  },
  loveText: {
    color: COLORS.background,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: COLORS.textLight,
  },
  iconLeft: {
    marginRight: SPACING.xs,
  },
  iconRight: {
    marginLeft: SPACING.xs,
  },
}); 