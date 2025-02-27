import React, {useState, useCallback} from 'react';
import {StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard, Platform, Text, Dimensions} from 'react-native';
import useSearchLocation from '@/hooks/useSearchLocation';
import { debounce } from 'lodash';
import SearchRegionResult from './SearchRegionResult';
import { RegionInfo } from '@/hooks/useSearchLocation';
import { MaterialIcons } from '@expo/vector-icons';
import useSearchLocationStore from '@/store/useSearchLocationStore';
interface SearchLocationScreenProps {
    onLocationSelect?: (location: RegionInfo) => void;
}

function SearchLocationScreen({ onLocationSelect }: SearchLocationScreenProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<RegionInfo | null>(null);
    const {setLocation} = useSearchLocationStore();
    
    // 디바운스된 검색 쿼리를 위한 상태
    const [debouncedQuery, setDebouncedQuery] = useState('');
    
    // API 호출 결과 사용
    const { regionInfo, hasMore, handleLoadMore, isLoading, error } = useSearchLocation(debouncedQuery);

    // 디바운스된 쿼리 업데이트 함수
    const updateDebouncedQuery = useCallback(
        debounce((text: string) => {
            setDebouncedQuery(text);
        }, 300),
        []
    );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setIsSearching(true);
        updateDebouncedQuery(text);
        setSelectedLocation(null);
    };

    const handleSelectPlace = (place: RegionInfo) => {
        setSearchQuery(place.place_name);
        setSelectedLocation(place);
        setLocation(place);
        setIsSearching(false);
        onLocationSelect?.(place);
        Keyboard.dismiss();
    };

    const handleCloseSearch = () => {
        setIsSearching(false);
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            {isSearching && (
                <TouchableWithoutFeedback onPress={handleCloseSearch}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>
            )}
            <View style={[styles.contentContainer, isSearching && styles.activeContent]}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        value={searchQuery}
                        onChangeText={handleSearch}
                        className="w-full border border-pink-100 rounded-xl px-4 py-3 bg-pink-50/30"
                        placeholder="만날 장소를 입력하세요"
                        onFocus={() => setIsSearching(true)}
                        autoComplete="off"
                        autoCorrect={false}
                        placeholderTextColor="#9CA3AF"
                    />
                    <SearchRegionResult 
                        regionInfo={regionInfo} 
                        handleSelectPlace={handleSelectPlace} 
                        isLoading={isLoading}
                        onLoadMore={handleLoadMore}
                        hasMore={hasMore}
                        error={error}
                        visible={isSearching}
                        onClose={handleCloseSearch}
                    />
                </View>
                {selectedLocation && !isSearching && (
                    <View className="mt-2 flex-row items-start bg-pink-50/50 p-3 rounded-lg border border-pink-100">
                        <MaterialIcons 
                            name="place" 
                            size={16} 
                            color="#4B5563"
                            style={{ marginTop: 2, marginRight: 8 }} 
                        />
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-gray-800">
                                {selectedLocation.place_name}
                            </Text>
                            <Text className="text-xs text-gray-500 mt-0.5">
                                {selectedLocation.address_name}
                            </Text>
                            {selectedLocation.road_address_name && (
                                <Text className="text-xs text-gray-400 mt-0.5">
                                    {selectedLocation.road_address_name}
                                </Text>
                            )}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
    },
    contentContainer: {
        width: '100%',
        position: 'relative',
    },
    activeContent: {
        zIndex: Platform.OS === 'ios' ? 2 : undefined,
        elevation: Platform.OS === 'android' ? 2 : undefined,
    },
    inputWrapper: {
        width: '100%',
        position: 'relative',
    },
    backdrop: {
        position: 'absolute',
        top: -1000,
        left: -1000,
        right: -1000,
        bottom: -1000,
        backgroundColor: 'transparent',
        zIndex: Platform.OS === 'ios' ? 1 : undefined,
        elevation: Platform.OS === 'android' ? 1 : undefined,
    }
});

export default SearchLocationScreen;