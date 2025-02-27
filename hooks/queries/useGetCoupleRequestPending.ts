import { getCouplePending } from "@/api/couple";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import useAuth from "./useAuth";
import { ProfileWithCouple } from "@/types";
function useGetCoupleRequestPending() {
    const { getMeQuery } = useAuth();
    const userData = getMeQuery.data as ProfileWithCouple | undefined;
    const user = userData?.user;
    return useQuery({
        queryKey: [queryKeys.COUPLE, queryKeys.COUPLE_REQUEST_PENDING, user?.coupleId],
        queryFn: getCouplePending,
        enabled: user?.coupleStatus === 'not_coupled',
        staleTime: 0, // 0초
        gcTime: 0, // 0초
        refetchOnMount: true,
        refetchOnWindowFocus: true,     
    });
}

export default useGetCoupleRequestPending;