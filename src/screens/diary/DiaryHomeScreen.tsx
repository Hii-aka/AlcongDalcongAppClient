import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Image, Pressable, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


interface DiaryHomeScreenProps {

}

function DiaryHomeScreen({}: DiaryHomeScreenProps) {
  return (
    <SafeAreaView className="pt-14 pb-16">
      <ScrollView>
      <View className="p-4">
        <View className="bg-white rounded-lg shadow-sm p-4">
          <View className='flex items-center gap-4'>
            <View className='relative w-16 h-16'>
              <Image className='rounded-full object-cover w-full h-full' />
              <View className='absolute -right-2 bottom-0 w-6 h-6 bg-custom rounded-full flex items-center justify-center'>
                <FontAwesome name="heart" size={12} color="red" />
              </View>
            </View>
            <View>
              <Text className='text-2xl font-bold'>00 * 00</Text>
              <Text className='text-gray-600 text-sm"'>함께한지 D+365일</Text>
              <Text className='text-custom text-sm'>1주년까지 D-7일</Text>
            </View>
          </View>
        </View>
      </View>
      {/* 오늘의 기분 */}
      <View className='px-4 mb-4'>
        <View className='bg-white rounded-lg shadow-sm p-4'>
          <Text className='text-xl font-bold mb-2'>오늘의 기분</Text>
          <View className='flex-row justify-between'>
            <Pressable className='items-center'>
              <View className='w-12 h-12 rounded-full bg-gray-100 items-center justify-center'>
                <FontAwesome name='smile-o' size={24} color='gray' />
              </View>
              <Text className='text-sm text-gray-600'>행복해</Text>
            </Pressable>
            <Pressable className='items-center'>
              <View className='w-12 h-12 rounded-full bg-gray-100 items-center justify-center'>
                <FontAwesome name='smile-o' size={24} color='gray' />
              </View>
              <Text className='text-sm text-gray-600'>좋아요</Text>
            </Pressable>
            <Pressable className='items-center'>
              <View className='w-12 h-12 rounded-full bg-gray-100 items-center justify-center'>
                <FontAwesome name='smile-o' size={24} color='gray' />
              </View>
              <Text className='text-sm text-gray-600'>그냥저냥</Text>
            </Pressable>
            <Pressable className='items-center'>
              <View className='w-12 h-12 rounded-full bg-gray-100 items-center justify-center'>
                <FontAwesome name='smile-o' size={24} color='gray' />
              </View>
              <Text className='text-sm text-gray-600'>슬퍼요</Text>
            </Pressable>
            <Pressable className='items-center'>
              <View className='w-12 h-12 rounded-full bg-gray-100 items-center justify-center'>
                <FontAwesome name='smile-o' size={24} color='gray' />
              </View>
              <Text className='text-sm text-gray-600'>화나요</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* 최근 일기 */}
      <View className='px-4'>
        <Text className='text-xl font-bold mb-4'>최근 일기</Text>
        <View className='space-y-4'>
          <View className='bg-white rounded-lg shadow-sm overflow-hidden'>
            <Image className='w-full h-48 object-cover' />
            <View className='p-4'>
              <View className='flex items-center justify-between mb-2'>
                <Text className='text-sm text-gray-600'>2024.02.14</Text>
                <FontAwesome name="heart" size={12} color="black" />
              </View>
              <Text className='text-lg font-semibold mb-2'>발렌타인데이 카페 데이트</Text>
              <Text className='text-gray-600 text-sm line-clamp-2'>오늘은 발렌타인데이 카페에 가서 커피를 마셨어요. 카페에서 커피를 마시면서 좋은 시간을 보냈어요. 오늘은 발렌타인데이 카페에 가서 커피를 마셨어요. 카페에서 커피를 마시면서 좋은 시간을 보냈어요. 오늘은 발렌타인데이 카페에 가서 커피를 마셨어요. 카페에서 커피를 마시면서 좋은 시간을 보냈어요.</Text>
            </View>
          </View>
          <View className='bg-white rounded-lg shadow-sm overflow-hidden'>
            <Image className='w-full h-48 object-cover' />
            <View className='p-4'>
              <View className='flex items-center justify-between mb-2'>
                <Text className='text-sm text-gray-600'>2024.02.13</Text>
                <FontAwesome name="heart" size={12} color="black" />
              </View>
              <Text className='text-lg font-semibold mb-2'>남산타워 야경 구경</Text>
              <Text className='text-gray-600 text-sm line-clamp-2'>오늘은 남산타워에서 야경을 보았어요. 반짝이는 도시의 불빛이 정말 예뻤어요. 사랑의 자물쇠도 걸고 왔답니다.</Text>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default DiaryHomeScreen;