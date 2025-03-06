import { useQuery } from "@tanstack/react-query";
import { getAllDateCalendars } from "@/api/date-calendar";
import { queryKeys } from "@/constants";

export const useGetAllDateCalendars = (year: number, month: number) => {
    return useQuery({
        queryFn: () => getAllDateCalendars(year, month),
        queryKey: [queryKeys.ALL_DATE_CALENDARS, year, month],
        enabled: !!year && !!month,
    });
};