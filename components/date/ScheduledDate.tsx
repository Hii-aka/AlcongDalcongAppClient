import { router } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface ScheduledDateProps {}

function ScheduledDate({}: ScheduledDateProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 20,
      }}
    >   
      <View className="mb-4">
        <View className="flex-row items-center mb-2">
          <FontAwesome5 name="heart" size={16} color="#EC4899" />
          <Text className="text-lg font-bold ml-2 text-gray-800">
            다가오는 데이트
          </Text>
        </View>
      </View>

      <View className="space-y-3">
        {[
          { 
            date: '2월 14일', 
            event: '강남 CGV 영화보기', 
            time: '19:00',
            icon: 'film',
            color: '#EC4899', // pink
          },
          { 
            date: '2월 17일', 
            event: '이태원 맛집투어', 
            time: '18:30',
            icon: 'utensils',
            color: '#8B5CF6', // violet
          },
        ].map(({ date, event, time, icon, color }) => (
          <Pressable 
            key={date} 
            className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
            onPress={() => router.push('/calendar/post')}
          >
            <View className="p-4">
              <View className="flex-row items-start">
                <View className="w-12 h-12 bg-pink-50 rounded-xl items-center justify-center mr-4">
                  <FontAwesome5 name={icon} size={20} color={color} />
                </View>
                
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <FontAwesome5 name="calendar-alt" size={16} color="#EC4899" />
                    <FontAwesome5 name="heart" size={12} color="#EC4899" style={{ marginLeft: -6, marginTop: -8 }} />
                  </View>
                  
                  <View className="flex-row items-center">
                    <FontAwesome5 name="map-marker-alt" size={12} color="#EC4899" />
                    <Text className="text-base text-gray-600 ml-2">
                      {event}
                    </Text>
                  </View>
                </View>

                <Pressable 
                  className="p-2 rounded-full active:bg-pink-50"
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push('/calendar/post');
                  }}
                >
                  <FontAwesome5 
                    name="pencil-alt" 
                    size={16} 
                    color="#EC4899" 
                  />
                </Pressable>
              </View>

              <View className="flex-row items-center mt-3 pt-3 border-t border-pink-50">
                <FontAwesome5 
                  name="clock" 
                  size={12} 
                  color="#EC4899" 
                />
                <Text className="text-sm text-gray-500 ml-2">
                  데이트까지 3일 남았어요
                </Text>
                <FontAwesome5 
                  name="heart" 
                  size={12} 
                  color="#EC4899" 
                  className="ml-1"
                />
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      {/* 데이트 없는 경우 */}
      {false && (
        <View className="items-center justify-center py-8">
          <FontAwesome5 name="heart" size={40} color="#E5E7EB" />
          <Text className="text-gray-400 mt-4 text-base">
            예정된 데이트가 없어요
          </Text>
          <Pressable 
            className="mt-4 flex-row items-center bg-pink-500 px-4 py-2 rounded-full"
            onPress={() => router.push('/calendar/post')}
          >
            <FontAwesome5 name="heart" size={14} color="white" />
            <Text className="text-white font-medium ml-2">
              새로운 데이트 추가하기
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

export default ScheduledDate;