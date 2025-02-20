import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, Animated } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import DiaryList from '@/components/diary/DiaryList';
// 기분 데이터 정의
const moods = [
  { 
    id: 'happy', 
    icon: 'grin-hearts',   // 하트 눈을 가진 행복한 표정
    text: '너무 행복해',
    activeColor: '#F472B6', // Pink-400 (더 부드러운 톤)
    bgColor: '#FCE7F3',     // Pink-100 (더 부드러운 배경)
    borderColor: '#FBCFE8',
    inactiveColor: '#FDA4AF', // 부드러운 핑크 색상 추가
  },
  { 
    id: 'good', 
    icon: 'kiss-beam',     // 키스하는 표정
    text: '설레여',
    activeColor: '#F472B6',
    bgColor: '#FCE7F3',
  },
  { 
    id: 'neutral', 
    icon: 'kiss-wink-heart', // 윙크하는 표정
    text: '달달해',
    activeColor: '#F472B6',
    bgColor: '#FCE7F3',
  },
  { 
    id: 'sad', 
    icon: 'sad-cry',       // 눈물 흘리는 표정
    text: '보고싶어',
    activeColor: '#F472B6',
    bgColor: '#FCE7F3',
  },
  { 
    id: 'angry', 
    icon: 'heart-broken',  // 깨진 하트
    text: '삐졌어',
    activeColor: '#F472B6',
    bgColor: '#FCE7F3',
  },
] as const;

type MoodType = typeof moods[number]['id'];

export default function DiaryHome() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const scaleAnimation = new Animated.Value(1);

  const handleMoodSelect = (moodId: MoodType) => {
    Animated.sequence([
      Animated.spring(scaleAnimation, {
        toValue: 1.15,
        useNativeDriver: true,
        speed: 30,
        bounciness: 12,
      }),
      Animated.spring(scaleAnimation, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
      }),
    ]).start();

    setSelectedMood(moodId);
    // TODO: 여기에 기분 저장 로직 추가
  };

  const HeaderComponent = () => (
    <>
      {/* 프로필 카드 */}
      <View className="p-5">
        <View className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <View className='flex-row items-center gap-5'>
            <View className='relative w-20 h-20'>
              <Image 
                className='rounded-full object-cover w-full h-full'
                defaultSource={require('@/assets/default-profile.png')} 
              />
              <View className='absolute -right-2 bottom-0 w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center border-2 border-white shadow-sm'>
                <FontAwesome5 name="heart" size={14} color="#EC4899" />
              </View>
            </View>
            <View className='flex-1'>
              <Text className='text-2xl font-bold mb-1'>00 * 00</Text>
              <Text className='text-gray-600 text-sm mb-1'>함께한지 D+365일</Text>
              <View className='bg-pink-50 rounded-full px-3 py-1 self-start'>
                <Text className='text-pink-500 text-sm font-medium'>
                  1주년까지 D-7일
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 오늘의 기분 */}
      <View className='px-5 mb-6'>
        <View className='bg-white rounded-2xl shadow-sm p-5 border border-pink-100'>
          <View className='flex-row items-center mb-4'>
            <FontAwesome5 name="heart" size={20} color="#EC4899" />
            <Text className='text-xl font-bold ml-2'>오늘 내 마음은...</Text>
          </View>
          
          <View className='flex-row justify-between'>
            {moods.map((mood) => (
              <Pressable 
                key={mood.id}
                className='items-center'
                onPress={() => handleMoodSelect(mood.id)}
                accessible={true}
                accessibilityLabel={`기분 선택: ${mood.text}`}
              >
                <Animated.View 
                  className={`w-14 h-14 rounded-full items-center justify-center mb-2`}
                  style={{
                    backgroundColor: 'white',
                    transform: [{ scale: selectedMood === mood.id ? scaleAnimation : 1 }],
                    borderWidth: 2,
                    borderColor: selectedMood === mood.id ? mood.activeColor : '#FEE2E2',
                    shadowColor: mood.activeColor,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: selectedMood === mood.id ? 0.3 : 0,
                    shadowRadius: 6,
                    elevation: selectedMood === mood.id ? 4 : 1,
                  }}
                >
                  <FontAwesome5 
                    name={mood.icon as any} 
                    size={24}
                    color={selectedMood === mood.id ? mood.activeColor : '#FDA4AF'} 
                  />
                </Animated.View>
                <Text 
                  className={`text-sm font-medium text-center`}
                  style={{ 
                    color: selectedMood === mood.id ? mood.activeColor : '#FDA4AF',
                    fontSize: 13,
                  }}
                >
                  {mood.text}
                </Text>
                {selectedMood === mood.id && (
                  <View className='absolute -top-1 -right-1 bg-white rounded-full p-0.5'>
                    <FontAwesome5 
                      name="heart" 
                      size={10} 
                      color={mood.activeColor} 
                      solid 
                    />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
          
          {selectedMood && (
            <View className='mt-4 bg-pink-50 rounded-xl p-3'>
              <Text className='text-pink-600 text-center text-sm'>
                오늘도 우리의 소중한 하루 ♥
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* 최근 일기 헤더 */}
      <View className='px-5 mb-4 flex-row justify-between items-center'>
        <Text className='text-xl font-bold'>최근 일기</Text>
        <Pressable 
          className='py-2 px-3 rounded-full bg-gray-50'
          accessible={true}
          accessibilityLabel="전체 일기 보기"
        >
          <Text className='text-sm text-gray-600'>전체보기</Text>
        </Pressable>
      </View>
    </>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <DiaryList 
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
} 