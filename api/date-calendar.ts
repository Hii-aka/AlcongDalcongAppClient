import { api } from "./ky";
import { ApiResponse, DateCalendarRequest, DateCalendarResponse } from "@/types";



const createDateCalendar = async (body: DateCalendarRequest) => {
    const {data} = await api.post<ApiResponse<DateCalendarResponse>>('date-calendars', body);
    console.log(data);
    return data;
};

export {createDateCalendar};
