import { api } from "./ky";
import { ApiResponse, Couple } from "@/types";
const createCouple = async ({receiverEmail, firstMetDate}: {receiverEmail: string, firstMetDate: string}) => {
    const {data} = await api.post<ApiResponse<string>>('couples/request', {receiverEmail, firstMetDate});
    return data;
};

const getCouplePending = async () => {
    const {data} = await api.get<ApiResponse<Couple[]>>('couples/request/pending');
    return data;
};

const getCoupleAccepted = async () => {
    const {data} = await api.get<ApiResponse<Couple>>('couples/request/accepted');
    return data;
};

type RespondCoupleRequest = {
    requestId: string;
    accept: boolean;
};

const respondCoupleRequest = async ({requestId, accept}: RespondCoupleRequest) => {
    const {data} = await api.post<ApiResponse<string>>(`couples/request/${requestId}/respond`, {accept});
    return data;
};

export {createCouple, getCouplePending, getCoupleAccepted, respondCoupleRequest};
