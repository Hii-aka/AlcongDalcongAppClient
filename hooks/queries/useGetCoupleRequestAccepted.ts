import { getCoupleAccepted } from "@/api/couple";
import useAuth from "./useAuth";
import { Profile } from "@/types";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
function useGetCoupleRequestAccepted() {
    const { getMeQuery } = useAuth();
    const { data: me } = getMeQuery as { data: Profile };
    return useQuery({
        queryKey: [queryKeys.COUPLE_REQUEST_ACCEPTED],
        queryFn: getCoupleAccepted,
        enabled: me.coupleStatus === 'coupled',
    });
}

export default useGetCoupleRequestAccepted;