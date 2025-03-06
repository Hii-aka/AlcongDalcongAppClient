import { useQuery } from "@tanstack/react-query";
import { getDateCalendarById } from "@/api/date-calendar";
import { queryKeys } from "@/constants";

export const useGetDateCalendarById = (id: string) => {
    return useQuery({
        queryKey: [queryKeys.DATE_CALENDAR_BY_ID, id],
        queryFn: () => getDateCalendarById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5분
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });
};