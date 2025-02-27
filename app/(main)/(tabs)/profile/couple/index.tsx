import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import CoupleTab from '@/components/couple/CoupleTab';
import useAuth from '@/hooks/queries/useAuth';
import { ProfileWithCouple } from '@/types';
import ConnectCouple from '@/components/chat/ConnectCouple';
import { router } from 'expo-router';
dayjs.locale('ko');

export default function CoupleConnect() {
  const { getMeQuery } = useAuth();
  const { data: {user, partner} } = getMeQuery as { data: ProfileWithCouple};
  


  return (
    <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        <View className="flex-row border-b border-pink-100 bg-white/80 mt-2">
          <CoupleTab 
            isActive
            label={partner && partner.coupleId ? "커플 정보" : "커플 연결하기"} 
          />
          <CoupleTab 
            isActive={false} 
            label="받은 신청" 
            onPress={() => router.push("/(main)/(tabs)/profile/couple/requests")}
          />
        </View>

        <ConnectCouple isConnected={partner && partner.coupleId   ? true : false} partner={partner} />
      </LinearGradient>
    </SafeAreaView>
  );
} 