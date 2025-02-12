import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

// 기분 데이터 정의
const moods = [
  { id: 'happy', icon: 'grin-beam', text: '행복해' },
  { id: 'good', icon: 'smile', text: '좋아요' },
  { id: 'neutral', icon: 'meh', text: '그냥저냥' },
  { id: 'sad', icon: 'frown', text: '슬퍼요' },
  { id: 'angry', icon: 'angry', text: '화나요' },
] as const;

type MoodType = typeof moods[number]['id'];

export default function DiaryHome() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const handleMoodSelect = (moodId: MoodType) => {
    setSelectedMood(moodId);
    // TODO: 여기에 기분 저장 로직 추가
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-4">
          <View className="bg-white rounded-lg shadow-sm p-4">
            <View className='flex items-center gap-4'>
              <View className='relative w-16 h-16'>
                <Image className='rounded-full object-cover w-full h-full' />
                <View className='absolute -right-2 bottom-0 w-6 h-6 bg-custom rounded-full flex items-center justify-center'>
                  <FontAwesome5 name="heart" size={12} color="red" />
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
              {moods.map((mood) => (
                <Pressable 
                  key={mood.id}
                  className='items-center'
                  onPress={() => handleMoodSelect(mood.id)}
                >
                  <View className={`w-12 h-12 rounded-full items-center justify-center ${
                    selectedMood === mood.id ? 'bg-pink-400' : 'bg-gray-100'
                  }`}>
                    <FontAwesome5 
                      name={mood.icon as any} 
                      size={24} 
                      color={selectedMood === mood.id ? 'white' : 'gray'} 
                    />
                  </View>
                  <Text className={`text-sm ${
                    selectedMood === mood.id ? 'text-pink-400' : 'text-gray-600'
                  }`}>
                    {mood.text}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* 최근 일기 */}
        <View className='px-4'>
          <Text className='text-xl font-bold mb-4'>최근 일기</Text>
          <View className='space-y-4'>
            <Pressable onPress={() => router.push('/diary/post')}>
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
            </Pressable>

            <Pressable onPress={() => router.push('/diary/post')}>
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
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 