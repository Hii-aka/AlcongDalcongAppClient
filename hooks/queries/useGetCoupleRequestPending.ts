import { getCouplePending } from "@/api/couple";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import useAuth from "./useAuth";
import { ProfileWithCouple } from "@/types";
function useGetCoupleRequestPending() {
    const { getMeQuery } = useAuth();
    const { data: {user} } = getMeQuery as { data: ProfileWithCouple };
    return useQuery({
        queryKey: [queryKeys.COUPLE, queryKeys.COUPLE_REQUEST_PENDING, user.coupleId],
        queryFn: getCouplePending,
        enabled: user?.coupleStatus === 'not_coupled',
    });
}

export default useGetCoupleRequestPending;