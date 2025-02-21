import ky from "ky";
import { getEnvVar } from "@/utils/env";
import { useEffect, useState } from "react";

type Meta = {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
    same_name: {
      region: string[];
      keyword: string;
      selected_region: string;
    };
};
  
export type RegionInfo = {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
};
  
type RegionResponse = {
    meta: Meta;
    documents: RegionInfo[];
};

function useSearchLocation(keyword: string) {
    const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageParam, setPageParam] = useState<number>(1);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // Reset state when keyword changes
    useEffect(() => {
        setRegionInfo([]);
        setPageParam(1);
        setError(null);
        setIsFirstLoad(true);
    }, [keyword]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            setPageParam(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (!keyword.trim()) {
            setRegionInfo([]);
            setHasMore(false);
            return;
        }

        const fetchLocations = async () => {
            if (isLoading) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                const apiKey = getEnvVar('KAKAO_REST_API_KEY');
                if (!apiKey) {
                    throw new Error('Kakao API key is not configured');
                }

                const response = await ky.get(
                    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&page=${pageParam}&size=15`,
                    {
                        headers: {
                            Authorization: `KakaoAK ${apiKey}`
                        }
                    }
                ).json<RegionResponse>();

                setRegionInfo(prev => {
                    if (isFirstLoad) {
                        setIsFirstLoad(false);
                        return response.documents;
                    }
                    return [...prev, ...response.documents];
                });
                
                setHasMore(!response.meta.is_end && response.documents.length > 0);
            } catch (error: any) {
                console.error('Location search error:', error);
                setError(error.message || '장소 검색 중 오류가 발생했습니다.');
                if (isFirstLoad) {
                    setRegionInfo([]);
                }
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, [keyword, pageParam]);

    return { 
        regionInfo, 
        hasMore, 
        handleLoadMore, 
        isLoading,
        error
    };
}

export default useSearchLocation;
