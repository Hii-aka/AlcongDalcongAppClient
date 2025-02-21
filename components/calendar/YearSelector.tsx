import { numbers } from '@/constants/numbers';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View, Animated } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface YearSelectorProps {
  isVisible: boolean;
  currentyear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({
  isVisible,
  currentyear,
  onChangeYear,
  hide,
}: YearSelectorProps) {
  const [scrollY, setScrollY] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [isVisible]);

  useEffect(() => {
    const yearIndex = currentyear - numbers.MIN_CALENDAR_YEAR;
    const currentRow = Math.floor(
      yearIndex / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
    );
    const scrollToY = currentRow * 50;
    setScrollY(scrollToY);
  }, [isVisible, currentyear]);

  if (!isVisible) return null;

  return (
    <Animated.View 
      className="absolute w-full shadow-lg"
      style={{ opacity: fadeAnim }}
    >
      <View className="items-center bg-white rounded-t-2xl">
        <View className="w-full px-4 py-4 border-b border-pink-100">
          <View className="flex-row items-center justify-center">
            <FontAwesome5 name="calendar" size={18} color="#EC4899" />
            <Text className="text-lg font-bold ml-2 text-gray-800">
              연도 선택
            </Text>
          </View>
        </View>

        <FlatList
          className="w-full px-3 py-3 bg-white"
          showsVerticalScrollIndicator={false}
          contentOffset={{ x: 0, y: scrollY }}
          initialNumToRender={currentyear - numbers.MIN_CALENDAR_YEAR}
          data={Array.from(
            {
              length:
                numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
            },
            (_, index) => ({
              id: index,
              num: index + numbers.MIN_CALENDAR_YEAR,
            }),
          )}
          renderItem={({ item }) => (
            <Pressable
              key={item.num}
              onPress={() => onChangeYear(item.num)}
              className={`w-[24%] h-12 mx-[0.5%] my-1 rounded-xl 
                items-center justify-center relative
                ${currentyear === item.num 
                  ? 'bg-pink-500 shadow-sm' 
                  : 'bg-pink-50/50 border border-pink-100'
                }`}
              style={{
                shadowColor: currentyear === item.num ? '#EC4899' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: currentyear === item.num ? 4 : 0,
              }}
            >
              <Text
                className={`text-base
                  ${currentyear === item.num 
                    ? 'text-white font-bold' 
                    : 'text-gray-600 font-medium'
                  }`}
              >
                {item.num}
              </Text>
              {currentyear === item.num && (
                <View className="absolute -right-1 -top-1">
                  <FontAwesome5 
                    name="heart" 
                    size={12} 
                    color="#FFF"
                    solid 
                  />
                </View>
              )}
            </Pressable>
          )}
          keyExtractor={item => String(item.num)}
          numColumns={4}
          className="h-[240px]"
        />
      </View>

      <Pressable 
        className="flex-row bg-white p-4 items-center justify-center 
          border-t border-pink-100 rounded-b-2xl space-x-1
          active:bg-pink-50"
        onPress={hide}
      >
        <Text className="text-pink-500 text-base font-semibold">
          선택 완료
        </Text>
        <FontAwesome5 
          name="heart" 
          size={14} 
          color="#EC4899"
        />
      </Pressable>
    </Animated.View>
  );
}

export default YearSelector;
