import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disconnectCouple } from "@/api/auth";
import { queryKeys } from "@/constants";
function useDisconnectCouple() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: disconnectCouple,
        onSuccess: ({coupleId}) => {
            console.log('[useDisconnectCouple] onSuccess', coupleId);
            queryClient.invalidateQueries({
                queryKey: [queryKeys.AUTH, queryKeys.GET_ME]
            });
            queryClient.invalidateQueries({
                queryKey: [queryKeys.COUPLE, queryKeys.COUPLE_REQUEST_PENDING, coupleId]
            });
            queryClient.invalidateQueries({
                queryKey: [queryKeys.COUPLE, queryKeys.COUPLE_REQUEST_ACCEPTED, coupleId]
            });
        },
    });
}   

export default useDisconnectCouple;