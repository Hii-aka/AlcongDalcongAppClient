import { useMutation } from "@tanstack/react-query";
import { createDateCalendar } from "@/api/date-calendar";

function useCreateDateCalendar() {
    return useMutation({
        mutationFn: createDateCalendar,
    });
}   

export default useCreateDateCalendar;