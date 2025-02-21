import React from 'react';
import {Pressable, View, Text, ActivityIndicator, StyleSheet, Platform, Dimensions} from 'react-native';
import { RegionInfo } from '@/hooks/useSearchLocation';
import { MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

interface SearchRegionResultProps {
    regionInfo: RegionInfo[];
    handleSelectPlace: (place: RegionInfo) => void;
    isLoading?: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
    error?: string | null;
    visible: boolean;
    onClose: () => void;
}

function SearchRegionResult({
    regionInfo, 
    handleSelectPlace,
    isLoading,
    onLoadMore,
    hasMore,
    error,
    visible,
    onClose
}: SearchRegionResultProps) {
  if (!visible) return null;

  if (error) {
    return (
      <View style={styles.resultContainer}>
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.resultContainer}>
      <View style={styles.listContainer}>
        <FlashList
          data={regionInfo}
          estimatedItemSize={80}
          keyExtractor={(item, index) => `${item.id}-${item.place_name}-${index}`}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelectPlace(item)}
              style={({ pressed }) => [
                styles.resultItem,
                pressed && styles.resultItemPressed
              ]}
            >
              <View className="flex-row">
                <MaterialIcons 
                  name="place" 
                  size={20} 
                  color="#4B5563"
                  style={styles.locationIcon} 
                />
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
                    {item.place_name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-sm text-gray-500" numberOfLines={2}>
                      {item.address_name}
                    </Text>
                  </View>
                  {item.road_address_name && (
                    <Text className="text-xs text-gray-400 mt-0.5" numberOfLines={1}>
                      {item.road_address_name}
                    </Text>
                  )}
                </View>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <View className="p-4">
              <Text className="text-gray-500 text-center">
                {isLoading ? '검색 중...' : '검색 결과가 없습니다'}
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
          onEndReachedThreshold={0.5}
          drawDistance={300}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    maxHeight: 300,
    zIndex: 9999,
    elevation: Platform.OS === 'android' ? 9999 : undefined,
  },
  listContainer: {
    flex: 1,
    height: 300,
  },
  resultItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  resultItemPressed: {
    backgroundColor: '#f9fafb',
  },
  locationIcon: {
    marginRight: 12,
    marginTop: 2,
  }
});

export default SearchRegionResult;