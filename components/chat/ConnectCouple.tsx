import { COLORS, SHADOWS } from '@/constants/theme';
import React, { useState } from 'react';
import {ScrollView, KeyboardAvoidingView, StyleSheet, View, Platform, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, Pressable } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from '@/components/couple/EmailInput';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import DatePicker from '@/components/couple/DatePicker';
import { TextInput } from 'react-native';
import dayjs from 'dayjs';
import useCreateCouple from '@/hooks/queries/useCreateCouple';
import { Profile } from '@/types';
import ConnectButton from '@/components/couple/ConnectButton';
import useDisconnectCouple from '@/hooks/queries/useDisconnectCouple';
dayjs.locale('ko');

interface CoupleForm {
    receiverEmail: string;
    firstMetDate: string;
    coupleNickname: string;
  }

interface ConnectCoupleProps {
    isConnected?: boolean;
    partner?: Profile | null;
}

function ConnectCouple({isConnected = false, partner = null}: ConnectCoupleProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const createCoupleMutation = useCreateCouple();
    const disconnectCoupleMutation = useDisconnectCouple();
    const coupleForm = useForm<CoupleForm>({
        defaultValues: {
          receiverEmail: '',
          firstMetDate: '',
          coupleNickname: '',
        },
      });
    
      const onSubmit = async (data: CoupleForm) => {
        const {receiverEmail, firstMetDate} = data;

        try {
          setIsSubmitting(true);
          createCoupleMutation.mutate({
            receiverEmail,
            firstMetDate,
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      const handleDisconnect = () => {
        if (partner?.coupleId) {
          disconnectCoupleMutation.mutate({
            coupleId: partner.coupleId,
          });
        }
      }

  return (
    <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {/* 헤더 섹션 */}
            <Animated.View 
              entering={FadeInDown.duration(600)}
              className="items-center px-6 py-8"
            >
              <LinearGradient
                colors={[COLORS.love, COLORS.primary]}
                className="w-20 h-20 rounded-full items-center justify-center mb-4"
                style={SHADOWS.medium}
              >
                <FontAwesome5 name="heart" size={32} color="#FFFFFF" />
              </LinearGradient>
              <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
                {isConnected ? "커플 정보" : "연인과 연결하기"}
              </Text>
              <Text className="text-gray-500 text-center px-6">
                {isConnected ? "커플 정보" : "상대방의 이메일을 입력하여 커플 신청을 보내세요"}
              </Text>
            </Animated.View>

            {/* 메인 폼 */}
            <Animated.View 
              entering={FadeInDown.delay(200).duration(600)}
              className="px-6"
            >
              <View className="bg-white/80 p-6 rounded-3xl shadow-sm border border-pink-100">
                <FormProvider {...coupleForm}>
                  <View className="space-y-6">
                    {/* 이메일 입력 */}
                    <EmailInput isConnected={isConnected} partner={partner} />

                    {/* 처음 만난 날짜 */}
                    <DatePicker isConnected={isConnected} partner={partner} />

                    {/* 커플 닉네임 */}
                    <View>
                      <Text className="text-gray-600 font-medium mb-2">
                        커플 닉네임
                        <Text className="text-gray-400 text-sm font-normal"> (선택)</Text>
                      </Text>
                      <Pressable 
                        className="flex-row items-center border border-pink-100 rounded-xl px-4 py-3 bg-white"
                      >
                        <MaterialIcons name="favorite" size={20} color={COLORS.love} />
                        <TextInput
                          placeholder="커플 닉네임을 입력하세요"
                          className="flex-1 ml-2 text-base text-gray-800"
                          placeholderTextColor="#9CA3AF"
                          onChangeText={(text) => coupleForm.setValue('coupleNickname', text)}
                          returnKeyType="done"
                        />
                      </Pressable>
                    </View>

                    {/* 제출 버튼 */}
                   <ConnectButton
                    onPress={isConnected ? handleDisconnect : coupleForm.handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                    isConnected={isConnected}
                   />
                  </View>
                </FormProvider>
              </View>
            </Animated.View>

            {/* 안내 메시지 */}
            <Animated.View 
              entering={FadeInDown.delay(400).duration(600)}
              className="mt-6 mx-6"
            >
              <View className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                <View className="flex-row items-center mb-2">
                  <MaterialIcons name="info" size={20} color={COLORS.love} />
                  <Text className="ml-2 font-medium text-pink-600">알려드립니다</Text>
                </View>
                <Text className="text-pink-600 text-sm leading-5">
                  • 입력하신 이메일로 상대방에게 초대장이 발송됩니다.{'\n'}
                  • 상대방이 수락하면 연결이 완료됩니다.{'\n'}
                  • 연결이 완료되면 알림을 보내드립니다.
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView> 
  )
}

const styles = StyleSheet.create({});

export default ConnectCouple;