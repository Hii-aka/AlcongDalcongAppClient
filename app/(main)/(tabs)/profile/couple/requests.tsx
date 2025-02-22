import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import useGetCoupleRequestPending from '@/hooks/queries/useGetCoupleRequestPending';
import { Couple } from '@/types';
import useAuth from '@/hooks/queries/useAuth';

export default function CoupleRequestsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { getMeQuery } = useAuth();
  const { data: me } = getMeQuery;
  const { data: coupleRequestPending } = useGetCoupleRequestPending();

  const [requests, setRequests] = useState<Couple[]>(coupleRequestPending ?? []);

  const handleAcceptRequest = async (requestId: string) => {
    setIsLoading(true);
    try {
      // TODO: API 호출로 커플 신청 수락 처리
      // await acceptCoupleRequest(requestId);
      
      // 임시로 목록에서 제거
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('커플 신청 수락 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    setIsLoading(true);
    try {
      // TODO: API 호출로 커플 신청 거절 처리
      // await rejectCoupleRequest(requestId);
      
      // 임시로 목록에서 제거
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('커플 신청 거절 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#EC4899" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <View className="flex-row border-b border-gray-200 bg-white">
        <Pressable 
          className="flex-1 py-3 items-center"
          onPress={() => router.navigate("/profile/couple")}
        >
          <Text className="text-gray-500">커플 연결하기</Text>
        </Pressable>
        <Pressable className="flex-1 py-3 items-center border-b-2 border-pink-500">
          <Text className="text-pink-500 font-semibold">받은 신청</Text>
        </Pressable>
      </View>
      <ScrollView className="flex-1">
        {requests.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <View className="w-20 h-20 bg-pink-100 rounded-full items-center justify-center mb-4">
              <FontAwesome5 name="heart" size={32} color="#EC4899" />
            </View>
            <Text className="text-gray-500 text-center">
              새로운 커플 신청이 없습니다
            </Text>
          </View>
        ) : (
          <View className="p-4 space-y-4">
            {requests.map((request) => (
              request.receiver.id === me?.id && (
              <View 
                key={request.id} 
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
              >
                <View className="flex-row items-center">
                  <Image 
                    source={require('@/assets/images/default-profile.png')} 
                    className="w-12 h-12 rounded-full"
                  />
                  <View className="ml-3 flex-1">
                    <Text className="font-semibold text-gray-900">
                      {request.sender.nickname}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {request.firstMetDate}
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row justify-end mt-4 space-x-3">
                  <TouchableOpacity
                    className="px-4 py-2 rounded-xl bg-gray-100"
                    onPress={() => handleRejectRequest(request.id.toString())}
                    disabled={isLoading}
                  >
                    <Text className="text-gray-700 font-medium">거절</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="px-4 py-2 rounded-xl bg-pink-500"
                    onPress={() => handleAcceptRequest(request.id.toString())}
                    disabled={isLoading}
                  >
                    <Text className="text-white font-medium">수락</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
            ))
          }
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 