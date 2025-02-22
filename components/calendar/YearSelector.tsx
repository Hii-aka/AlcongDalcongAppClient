import { numbers } from '@/constants/numbers';
import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable, Text, View, Animated } from 'react-native';
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

  if (!isVisible) return null;

  const years = Array.from(
    {
      length: numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
    },
    (_, index) => ({
      id: index,
      num: index + numbers.MIN_CALENDAR_YEAR,
    }),
  );

  const ListHeader = () => (
    <View className="items-center bg-white rounded-t-2xl">
      <View className="w-full px-4 py-4 border-b border-pink-100">
        <View className="flex-row items-center justify-center">
          <FontAwesome5 name="calendar" size={18} color="#EC4899" />
          <Text className="text-lg font-bold ml-2 text-gray-800">
            연도 선택
          </Text>
        </View>
      </View>
    </View>
  );

  const ListFooter = () => (
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
  );

  const renderYearGrid = () => {
    const rows = [];
    for (let i = 0; i < years.length; i += 4) {
      const rowYears = years.slice(i, i + 4);
      rows.push(
        <View key={i} className="flex-row justify-between">
          {rowYears.map((item) => (
            <Pressable
              key={item.id}
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
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <Animated.View 
      className="absolute w-full shadow-lg bg-white"
      style={{ opacity: fadeAnim }}
    >
      <View style={{ maxHeight: 320 }}>
        <ListHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingVertical: 12,
          }}
        >
          {renderYearGrid()}
        </ScrollView>
        <ListFooter />
      </View>
    </Animated.View>
  );
}

export default YearSelector;
