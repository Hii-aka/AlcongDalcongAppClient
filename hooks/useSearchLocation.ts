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
    const [pageParam, setPageParam] = useState<number>(1);

    const handleLoadMore = () => {
        setPageParam(prev => prev + 1);
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try{
                const response = await ky.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&page=${pageParam}`, {
                    headers: {
                        Authorization: `KakaoAK ${getEnvVar('KAKAO_REST_API_KEY')}`
                    }
                }).json<RegionResponse>();
                setRegionInfo(response.documents);
                setHasMore(!response.meta.is_end);
            } catch (error) {
                console.error(error);
                setRegionInfo([]);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [keyword]);
    return { regionInfo, hasMore, handleLoadMore, isLoading };
}

export default useSearchLocation;
