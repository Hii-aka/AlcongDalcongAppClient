import { respondCoupleRequest } from "@/api/couple";
import queryClient from "@/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/constants";

function useRespondCoupleRequest() {
    return useMutation({
        mutationFn: respondCoupleRequest,
        onSuccess: (data) => {
            console.log('[useRespondCoupleRequest] onSuccess:', data);
            queryClient.invalidateQueries({ queryKey: [queryKeys.COUPLE, queryKeys.COUPLE_REQUEST_PENDING , data.id] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.COUPLE,queryKeys.COUPLE_REQUEST_ACCEPTED , data.id] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH,queryKeys.GET_ME] });
        },
    });
}

export default useRespondCoupleRequest; 