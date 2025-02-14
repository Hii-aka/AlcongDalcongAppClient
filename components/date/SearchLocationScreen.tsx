import React, {useState, useCallback} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import useSearchLocation from '@/hooks/useSearchLocation';
import { debounce } from 'lodash';
import SearchRegionResult from './SearchRegionResult';

interface SearchLocationScreenProps {

}

// 임시 장소 검색 결과 타입
interface PlaceResult {
    id: string;
    name: string;
    address: string;
  }

   // 실제 구현 시에는 API 호출로 대체
   const mockSearchResults: PlaceResult[] = [
    { id: '1', name: '스타벅스 강남점', address: '서울 강남구 테헤란로 1' },
    { id: '2', name: '스타벅스 역삼점', address: '서울 강남구 테헤란로 2' },
    { id: '3', name: '투썸플레이스 강남점', address: '서울 강남구 테헤란로 3' },
  ];

function SearchLocationScreen({}: SearchLocationScreenProps){
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // 디바운스된 검색 쿼리를 위한 상태
    const [debouncedQuery, setDebouncedQuery] = useState('');
    
    // API 호출 결과 사용
    const { regionInfo, hasMore, handleLoadMore, isLoading } = useSearchLocation(debouncedQuery);

    console.log('hasMore', hasMore);

    // 디바운스된 쿼리 업데이트 함수
    const updateDebouncedQuery = useCallback(
        debounce((text: string) => {
            setDebouncedQuery(text);
        }, 500),
        []
    );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setIsSearching(true);
        updateDebouncedQuery(text);
    };

    const handleSelectPlace = (place: any) => {
        setSearchQuery(place.place_name);
        setIsSearching(false);
    };

    return (
        <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
                장소
            </Text>
            <TextInput
                value={searchQuery}
                onChangeText={handleSearch}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="만날 장소를 입력하세요"
                onFocus={() => setIsSearching(true)}
            />
            {isSearching && (
                <SearchRegionResult 
                    regionInfo={regionInfo} 
                    handleSelectPlace={handleSelectPlace} 
                    isLoading={isLoading}
                    onLoadMore={handleLoadMore}
                    hasMore={hasMore}
                />
            )}
        </View>
    );
}

export default SearchLocationScreen;