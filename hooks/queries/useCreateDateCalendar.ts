import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDateCalendar } from "@/api/date-calendar";
import { queryKeys } from "@/constants/key";
import { getMonth, getYear } from "@/utils/date";
function useCreateDateCalendar() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDateCalendar,
        onSuccess: ({id, date}) => {
            queryClient.invalidateQueries({ queryKey: [
                queryKeys.ALL_DATE_CALENDARS, getYear(date), getMonth(date)
            ]});
        },
    });
}   

export default useCreateDateCalendar;