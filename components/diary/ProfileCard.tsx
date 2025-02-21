import { View, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface ProfileCardProps {
    daysCount: number;
    daysUntilAnniversary: number;
  }
  
  export function ProfileCard({ daysCount, daysUntilAnniversary }: ProfileCardProps) {
    return (
      <View className="p-5">
        <View className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <View className="flex-row items-center gap-5">
            <View className="relative w-20 h-20">
              <Image 
                className="rounded-full object-cover w-full h-full"
                source={require('@/assets/images/default-profile.png')} 
              />
              <View className="absolute -right-2 bottom-0 w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <FontAwesome5 name="heart" size={14} color="#EC4899" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold mb-1">00 * 00</Text>
              <Text className="text-gray-600 text-sm mb-1">함께한지 D+{daysCount}일</Text>
              <View className="bg-pink-50 rounded-full px-3 py-1 self-start">
                <Text className="text-pink-500 text-sm font-medium">
                  1주년까지 D-{daysUntilAnniversary}일
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }