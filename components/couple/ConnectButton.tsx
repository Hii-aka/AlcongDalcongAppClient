import { COLORS, SHADOWS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {ActivityIndicator, Pressable, Text} from 'react-native';

interface ConnectButtonProps {
    onPress: () => void;
    disabled?: boolean;
    isSubmitting?: boolean;
    isConnected?: boolean;
}

function ConnectButton({
    onPress,
    disabled = false,
    isSubmitting = false,
    isConnected = false,
}: ConnectButtonProps) {
  return (
    <Pressable
    onPress={onPress}
    disabled={disabled}
    className="mt-6 overflow-hidden rounded-2xl"
    style={SHADOWS.medium}
  >
    <LinearGradient
      colors={[COLORS.love, COLORS.primary]}
      className="py-4 px-6"
    >
      <Text className="text-white text-center font-bold text-lg">
        {isSubmitting ? "신청 중..." : isConnected ? "커플 연결 해제" : "커플 신청하기"}
      </Text>
      {isSubmitting && (
        <ActivityIndicator size="small" color="white" style={{ marginLeft: 8 }} />
      )}
    </LinearGradient>
  </Pressable>
  )
}

export default ConnectButton;