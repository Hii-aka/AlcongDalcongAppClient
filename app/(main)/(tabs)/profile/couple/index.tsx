import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import EmailInput from '@/components/couple/EmailInput';
import DatePicker from '@/components/couple/DatePicker';
import useCreateCouple from '@/hooks/queries/useCreateCouple';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CoupleTab from '@/components/couple/CoupleTab';
import useAuth from '@/hooks/queries/useAuth';
import { ProfileWithCouple } from '@/types';
import ConnectCouple from '@/components/chat/ConnectCouple';
dayjs.locale('ko');

interface CoupleForm {
  receiverEmail: string;
  firstMetDate: string;
  coupleNickname: string;
}

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
            label={partner ? "커플 정보" : "커플 연결하기"} 
          />
          <CoupleTab 
            isActive={false} 
            label="받은 신청" 
            onPress={() => router.push("/(main)/(tabs)/profile/couple/requests")}
          />
        </View>

        <ConnectCouple isConnected={partner ? true : false} partner={partner} />
      </LinearGradient>
    </SafeAreaView>
  );
} 