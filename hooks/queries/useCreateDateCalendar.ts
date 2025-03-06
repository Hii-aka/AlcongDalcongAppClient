import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDateCalendar } from "@/api/date-calendar";
import { queryKeys } from "@/constants/key";
import { createDateCalendarResponse, UseMutationCustomOptions } from "@/types";
import { getMonth, getYear } from "@/utils/date";
import queryClient from "@/api/queryClient";

function useCreateDateCalendar(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: createDateCalendar,
        onSuccess: (response) => {
            if (!response) return;
            queryClient.invalidateQueries({ queryKey: [
                queryKeys.ALL_DATE_CALENDARS, getYear(response.date), getMonth(response.date)
            ]});
        },
        ...mutationOptions,
    });
}   

export default useCreateDateCalendar;