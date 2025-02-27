import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import useGetCoupleRequestPending from '@/hooks/queries/useGetCoupleRequestPending';
import { Couple, ProfileWithCouple } from '@/types';
import useAuth from '@/hooks/queries/useAuth';
import useRespondCoupleRequest from '@/hooks/queries/useRespondCoupleRequest';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '@/constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import CoupleTab from '@/components/couple/CoupleTab';

export default function CoupleRequestsPage() {
  const { getMeQuery } = useAuth();
  const userData = getMeQuery.data as ProfileWithCouple | undefined;
  const user = userData?.user;
  const partner = userData?.partner;
  const { data: requests, isLoading: isLoadingRequests, isError ,error} = useGetCoupleRequestPending();
  const respondCoupleRequest = useRespondCoupleRequest();
  const [receivedRequests, setReceivedRequests] = useState<Couple[]>([]);

  useEffect(() => {
    if (requests) {
      setReceivedRequests(requests.filter(request => request.receiver.id === user?.id));
    }
  }, [requests]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await respondCoupleRequest.mutateAsync({ requestId, accept: true });
      Toast.show({
        text1: '커플 신청이 수락되었습니다.',
      }); 
      router.replace('/profile');
    } catch (error) {
      console.error('커플 신청 수락 중 오류 발생:', error);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await respondCoupleRequest.mutateAsync({ requestId, accept: false });
      Toast.show({
        text1: '커플 신청이 거절되었습니다.',
      });
      router.replace('/profile');
    } catch (error) {
      console.error('커플 신청 거절 중 오류 발생:', error);
    }
  };

  if (isLoadingRequests || respondCoupleRequest.isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color={COLORS.love} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        className="flex-1"
      >
        <View className="flex-row border-b border-pink-100 bg-white/80 mt-2">
          <CoupleTab 
            isActive={false} 
            label={partner && partner.coupleId ? "커플 정보" : "커플 연결하기"} 
            onPress={() => router.push("/(main)/(tabs)/profile/couple")}
          />
          <CoupleTab 
            isActive
            label="받은 신청" 
            />
        </View>

        <ScrollView className="flex-1">
          {!receivedRequests || 
          receivedRequests.length === 0 || 
          receivedRequests.every(request => request.status !== 'pending') ? (
            <Animated.View 
              entering={FadeInDown.duration(600)}
              className="flex-1 justify-center items-center py-20"
            >
              <LinearGradient
                colors={[COLORS.love, COLORS.primary]}
                className="w-20 h-20 rounded-full items-center justify-center mb-4"
                style={SHADOWS.medium}
              >
                <FontAwesome5 name="heart" size={32} color="#FFFFFF" />
              </LinearGradient>
              <Text className="text-gray-500 text-center text-lg">
                새로운 커플 신청이 없습니다
              </Text>
            </Animated.View>
          ) : (
            <View className="p-6 space-y-4">
              {receivedRequests.map((request) => (
                request.status === 'pending' && (
                  <Animated.View 
                    key={request.id}
                    entering={FadeInDown.duration(600)}
                    className="bg-white/80 p-6 rounded-3xl shadow-sm border border-pink-100"
                  >
                    <View className="flex-row items-center">
                      <View className="relative">
                        <Image 
                          source={require('@/assets/images/default-profile.png')} 
                          className="w-16 h-16 rounded-full"
                        />
                        <View className="absolute -right-1 -bottom-1">
                          <View className="bg-green-400 w-4 h-4 rounded-full border-2 border-white" />
                        </View>
                      </View>
                      <View className="ml-4 flex-1">
                        <Text className="text-xl font-bold text-gray-900">
                          {request.sender.nickname}
                        </Text>
                        <Text className="text-gray-500 mt-1">
                          처음 만난 날: {request.firstMetDate}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-row justify-end mt-6 space-x-3">
                      <TouchableOpacity
                        className="px-6 py-3 rounded-xl bg-gray-100"
                        onPress={() => handleRejectRequest(request.id.toString())}
                        disabled={isLoadingRequests || respondCoupleRequest.isPending}
                      >
                        <Text className="text-gray-700 font-semibold">거절</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="px-6 py-3 rounded-xl"
                        style={SHADOWS.small}
                        onPress={() => handleAcceptRequest(request.id.toString())}
                        disabled={isLoadingRequests || respondCoupleRequest.isPending}
                      >
                        <LinearGradient
                          colors={[COLORS.love, COLORS.primary]}
                          className="absolute top-0 left-0 right-0 bottom-0 rounded-xl"
                        />
                        <Text className="text-white font-semibold">수락</Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                )
              ))}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
} 