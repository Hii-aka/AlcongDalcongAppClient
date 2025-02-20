import { api } from "./ky";
import { secureStorage } from "../utils/expo.securestore";
import { Profile, ApiResponse } from "@/types";

type RequestBody = {
    email: string;
    password: string;
};

const signUp = async ({email, password}: RequestBody) => {
    try {
        const {data} = await api.post<ApiResponse<string>>('auth/signup', {email, password});
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const login = async ({email, password}: RequestBody) => {
    try {
        const {data} = await api.post<ApiResponse<string>>('auth/login', {email, password});
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const logout = async () => {
    try {
        const {data} = await api.delete<ApiResponse<string>>('auth/logout');
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getMe = async () => {
    try {
        const {data} = await api.get<ApiResponse<Profile>>('auth/me');
        return data;
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
        const {data} = await api.get<ApiResponse<RefreshTokenResponse>>('auth/refresh', {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        return data;
    } catch (error) {   
        console.error(error);
        throw error;
    }
};

export {signUp, login, getAccessToken, logout, getMe};