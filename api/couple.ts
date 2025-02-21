import { api } from "./ky";
import { ApiResponse } from "@/types";
const createCouple = async ({receiverEmail, firstMetDate}: {receiverEmail: string, firstMetDate: string}) => {
    const {data} = await api.post<ApiResponse<string>>('couples/request', {receiverEmail, firstMetDate});
    return data;
};

const getCouple = async () => {
    const {data} = await api.get<ApiResponse<Couple>>('couples');
    return data;
};

export {createCouple, getCouple};
