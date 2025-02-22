import { respondCoupleRequest } from "@/api/couple";
import queryClient from "@/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/constants";

function useRespondCoupleRequest() {
    return useMutation({
        mutationFn: respondCoupleRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.COUPLE_REQUEST_PENDING] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.COUPLE_REQUEST_ACCEPTED] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ME] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH] });
        },
    });
}

export default useRespondCoupleRequest; 