import { getDateCalendar } from "@/api/date-calendar";
import { queryKeys } from "@/constants/key";
import { useQuery } from "@tanstack/react-query";

export function useGetDateCalendar(date: string) {
    return useQuery({
        queryKey: [queryKeys.DATE_CALENDAR, date],
        queryFn: () => getDateCalendar(date),
    });
}   