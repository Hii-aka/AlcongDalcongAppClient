import { getCoupleAccepted } from "@/api/couple";
import useAuth from "./useAuth";
import { ProfileWithCouple } from "@/types";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

function useGetCoupleRequestAccepted() {
    const { getMeQuery } = useAuth();
    const userData = getMeQuery.data as ProfileWithCouple | undefined;
    
    const user = userData?.user;
    const partner = userData?.partner;

    const coupleQuery = useQuery({
        queryKey: [queryKeys.COUPLE, queryKeys.COUPLE_REQUEST_ACCEPTED, user?.coupleId, partner?.coupleId],
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
        enabled: !!user && !!partner && user?.coupleStatus === 'coupled',
        staleTime: 0, // 0초
        gcTime: 0, // 0초
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    // 디버깅을 위한 로그
    // console.log('[useGetCoupleRequestAccepted] Hook state:', {
    //     user,
    //     coupleStatus: user?.coupleStatus,
    //     isLoading: coupleQuery.isLoading,
    //     isFetching: coupleQuery.isFetching,
    //     isError: coupleQuery.isError,
    //     error: coupleQuery.error,
    //     data: coupleQuery.data,
    //     firstMetDate: coupleQuery.data?.firstMetDate
    // });

    return coupleQuery;
}

export default useGetCoupleRequestAccepted;