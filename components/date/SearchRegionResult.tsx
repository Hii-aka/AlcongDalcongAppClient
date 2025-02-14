import React from 'react';
import {Pressable, View, FlatList, Text, ActivityIndicator} from 'react-native';
import { RegionInfo } from '@/hooks/useSearchLocation';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchRegionResultProps {
    regionInfo: RegionInfo[];
    handleSelectPlace: (place: RegionInfo) => void;
    isLoading?: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
}

function SearchRegionResult({
    regionInfo, 
    handleSelectPlace,
    isLoading,
    onLoadMore,
    hasMore
}: SearchRegionResultProps) {
  return (
    <View className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-100 max-h-64 z-50">
      <FlatList
        data={regionInfo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectPlace(item)}
            className="px-4 py-3 border-b border-gray-100 active:bg-gray-50"
          >
            <View className="flex-row items-center">
              <MaterialIcons 
                name="place" 
                size={20} 
                color="#4B5563"
                style={{ marginRight: 8 }} 
              />
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-800">
                  {item.place_name}
                </Text>
                <Text className="text-sm text-gray-500 mt-0.5">
                  {item.address_name}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View className="p-4">
            <Text className="text-gray-500 text-center">
              검색 결과가 없습니다
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          hasMore && (
            <View className="p-4">
              <ActivityIndicator color="#4B5563" />
            </View>
          )
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

export default SearchRegionResult;