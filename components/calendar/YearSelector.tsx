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
    <View className="absolute w-full shadow-lg">
      <View className="items-center bg-white rounded-t-2xl">
        <View className="w-full px-4 py-3 border-b border-gray-100">
          <Text className="text-lg font-semibold text-center text-gray-800">
            연도 선택
          </Text>
        </View>
        <FlatList
          className="w-full px-2 py-2 bg-white"
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
                items-center justify-center
                active:opacity-70
                ${currentyear === item.num 
                  ? 'bg-blue-500 shadow-sm' 
                  : 'bg-gray-50 hover:bg-gray-100'
                }`}
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
                <View className="absolute right-1.5 top-1.5">
                  <MaterialIcons
                    name="check-circle"
                    size={14}
                    color="white"
                  />
                </View>
              )}
            </Pressable>
          )}
          keyExtractor={item => String(item.num)}
          numColumns={4}
          className="h-[200px]"
        />
      </View>
      <Pressable 
        className="flex-row bg-white p-4 items-center justify-center 
          border-t border-gray-100 rounded-b-2xl
          active:bg-gray-50"
        onPress={hide}
      >
        <Text className="text-blue-500 text-base font-semibold mr-1">
          닫기
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color="#3b82f6"
        />
      </Pressable>
    </View>
  );
}

export default YearSelector;
