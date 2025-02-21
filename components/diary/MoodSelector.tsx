import { Animated, Pressable, View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useMemo } from "react";
import { useCallback } from "react";
import { MOODS, MoodType } from "@/constants/moods";

interface MoodSelectorProps {
    selectedMood: MoodType | null;
    onMoodSelect: (mood: MoodType) => void;
  }

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {

    const scaleAnimation = useMemo(() => new Animated.Value(1), []);

  const handleMoodSelect = useCallback((moodId: MoodType) => {
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

    onMoodSelect(moodId);
  }, [onMoodSelect, scaleAnimation]);   
    return (
        <View className='px-5 mb-6'>
        <View className='bg-white rounded-2xl shadow-sm p-5 border border-pink-100'>
          <View className='flex-row items-center mb-4'>
            <FontAwesome5 name="heart" size={20} color="#EC4899" />
            <Text className='text-xl font-bold ml-2'>오늘 내 마음은...</Text>
          </View>
          
          <View className='flex-row justify-between'>
            {MOODS.map((mood) => (
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
    );
}