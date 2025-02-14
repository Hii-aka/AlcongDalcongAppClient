import { View, Text, Pressable, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

interface DiaryItemProps {
  diary: {
    title: string;
    content: string;
    image: string;
    date: string;
  }
}

function DiaryItem({ diary }: DiaryItemProps) {
  return (
    
<Pressable onPress={() => router.push('/diary/post')}>
  <View className='bg-white rounded-lg shadow-sm overflow-hidden'>
    <Image className='w-full h-48 object-cover' source={{ uri: diary.image }} />
    <View className='p-4'>
      <View className='flex items-center justify-between mb-2'>
        <Text className='text-sm text-gray-600'>{diary.date}</Text>
        <FontAwesome name="heart" size={12} color="black" />
      </View>
      <Text className='text-lg font-semibold mb-2'>{diary.title}</Text>
      <Text className='text-gray-600 text-sm line-clamp-2'>{diary.content}</Text>
    </View>
  </View>
    </Pressable>
  )
}

export default DiaryItem;