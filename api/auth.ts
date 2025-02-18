import { api } from "./ky";
import ApiResponse from "./types/api.response";
import { secureStorage } from "../utils/expo.securestore";
type RequestBody = {
    email: string;
    password: string;
    nickname: string;
};

// const signUp = async ({email, password}: RequestBody) => {
//     try {
//         const response = await api.post<ApiResponse<string>>('auth/signup', {email, password});
//         console.log(response);
//         return response;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

const signUpMale = async ({email, password, nickname}: RequestBody) => {
    try {
        const response = await api.post<ApiResponse<string>>('auth/signup/male', {email, password, nickname});
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const signUpFemale = async ({email, password, nickname}: RequestBody) => {
    try {
        const response = await api.post<ApiResponse<string>>('auth/signup/female', {email, password, nickname});
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};  

const login = async ({email, password}: RequestBody) => {
    try {
        const response = await api.post<ApiResponse<string>>('auth/login', {email, password});
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const logout = async () => {
    try {
        const response = await api.delete<ApiResponse<string>>('auth/logout');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

const getAccessToken = async () => {
    const refreshToken = await secureStorage.getItem('refreshToken');
    try {
        const response = await api.get<ApiResponse<RefreshTokenResponse>>('auth/refresh', {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        return response;
    } catch (error) {   
        console.error(error);
        throw error;
    }
};

export {signUpMale, signUpFemale, login, getAccessToken, logout};