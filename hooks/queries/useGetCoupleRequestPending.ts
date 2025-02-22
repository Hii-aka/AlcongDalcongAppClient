import { getCouplePending } from "@/api/couple";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import useAuth from "./useAuth";
import { Profile } from "@/types";
function useGetCoupleRequestPending() {
    const { getMeQuery } = useAuth();
    const { data: me } = getMeQuery as { data: Profile };
    return useQuery({
        queryKey: [queryKeys.COUPLE_REQUEST_PENDING],
        queryFn: getCouplePending,
        enabled: me?.coupleStatus === 'not_coupled',
    });
}

export default useGetCoupleRequestPending;