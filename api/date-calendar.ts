import { api } from "./ky";
import { ApiResponse, DateCalendarRequest, DateCalendarResponse } from "@/types";



const createDateCalendar = async (body: DateCalendarRequest) => {
    const {data} = await api.post<ApiResponse<DateCalendarResponse>>('date-calendars', body);
    return data;
};

const getAllDateCalendars = async (year: number, month: number) => {
    const {data} = await api.get<ApiResponse<DateCalendarResponse[]>>(`date-calendars?year=${year}&month=${month}`);
    return data;
};

const getDateCalendar = async (id: string) => { 
    const {data} = await api.get<ApiResponse<DateCalendarResponse>>(`date-calendars/${id}`);
    return data;
};

const updateDateCalendar = async (id: string, body: DateCalendarRequest) => {
    const {data} = await api.put<ApiResponse<DateCalendarResponse>>(`date-calendars/${id}`, body);
    return data;
};

const deleteDateCalendar = async (id: string) => {
    const {data} = await api.delete<ApiResponse<DateCalendarResponse>>(`date-calendars/${id}`);
    return data;
};
export {createDateCalendar, getAllDateCalendars, getDateCalendar, updateDateCalendar, deleteDateCalendar};