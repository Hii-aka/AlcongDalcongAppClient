import { numbers } from '@/constants/numbers';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
    <View className="absolute w-full">
      <View className="items-center bg-white">
        <FlatList
          className="max-h-[200px] bg-white"
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
              className={`w-20 h-10 p-2.5 m-1.5 border rounded 
                items-center justify-center
                ${currentyear === item.num 
                  ? 'bg-pink-700 border-pink-700' 
                  : 'border-gray-500'
                }`}
            >
              <Text
                className={`text-base font-medium
                  ${currentyear === item.num 
                    ? 'text-white font-semibold' 
                    : 'text-gray-700'
                  }`}
              >
                {item.num}
              </Text>
            </Pressable>
          )}
          keyExtractor={item => String(item.num)}
          numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
        />
      </View>
      <Pressable 
        className="flex-row bg-white p-4 items-center justify-center 
          border-t border-b border-gray-500"
        onPress={hide}
      >
        <Text className="text-black text-base font-semibold">
          닫기
        </Text>
        <MaterialIcons
          name="keyboard-arrow-up"
          size={20}
          color="black"
        />
      </Pressable>
    </View>
  );
}

export default YearSelector;
