import { getCoupleAccepted } from "@/api/couple";
import useAuth from "./useAuth";
import { ProfileWithCouple } from "@/types";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

function useGetCoupleRequestAccepted() {
    const { getMeQuery } = useAuth();
    const { data: {user, partner}, isLoading: isMeLoading } = getMeQuery as { data: ProfileWithCouple; isLoading: boolean };

    const coupleQuery = useQuery({
        queryKey: [queryKeys.COUPLE_REQUEST_ACCEPTED],
        queryFn: async () => {
            const response = await getCoupleAccepted();
            console.log('[useGetCoupleRequestAccepted] API Response:', {
                fullResponse: response,
                firstMetDate: response?.firstMetDate,
                responseType: typeof response,
                hasFirstMetDate: 'firstMetDate' in (response || {})
            });
            return response;
        },
        enabled: !isMeLoading && (user?.coupleStatus === 'coupled'),
        staleTime: 0, // 항상 최신 데이터 사용
        gcTime: 5 * 60 * 1000, // 5분
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    // 디버깅을 위한 로그
    console.log('[useGetCoupleRequestAccepted] Hook state:', {
        user,
        coupleStatus: user?.coupleStatus,
        isLoading: coupleQuery.isLoading,
        isFetching: coupleQuery.isFetching,
        isError: coupleQuery.isError,
        error: coupleQuery.error,
        data: coupleQuery.data,
        firstMetDate: coupleQuery.data?.firstMetDate
    });

    return coupleQuery;
}

export default useGetCoupleRequestAccepted;