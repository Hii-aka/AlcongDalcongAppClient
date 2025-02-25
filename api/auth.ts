import { api } from "./ky";
import { secureStorage } from "../utils/expo.securestore";
import { Profile, ApiResponse } from "@/types";

type SignUpRequestBody = {
    email: string;
    password: string;
    nickname: string;
    gender: string;
};

type LoginRequestBody = {
    email: string;
    password: string;
};

const signUp = async ({email, password, nickname, gender}: SignUpRequestBody) => {
    const {data} = await api.post<ApiResponse<string>>('auth/signup', {email, password, nickname, gender});
    return data;
};

const login = async ({email, password}: LoginRequestBody) => {
    const {data} = await api.post<ApiResponse<string>>('auth/login', {email, password});
    return data;
};  

const logout = async () => {
    const {data} = await api.delete<ApiResponse<string>>('auth/logout');
    return data;
};

const getMe = async () => {
    const {data} = await api.get<ApiResponse<Profile>>('auth/me');
    return data;
};

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

const getAccessToken = async () => {
    const refreshToken = await secureStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token');
    }
    const {data} = await api.get<ApiResponse<RefreshTokenResponse>>('auth/refresh', {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        }
    });
        return data;
};

export {signUp, login, getAccessToken, logout, getMe};