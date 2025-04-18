import { SafeAreaView, View } from 'react-native';
import RecommendationOptions from '@/components/chat/RecommendationOptions';

export default function RecommendationOptionsHome() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <RecommendationOptions />
      </View>
    </SafeAreaView>
  );
}
