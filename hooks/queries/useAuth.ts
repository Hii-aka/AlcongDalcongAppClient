import { useMutation, useQuery } from "@tanstack/react-query";
import { signUp, login, getAccessToken, logout, getMe } from "../../api/auth";
import { useEffect, useState } from "react";
import { secureStorage } from "../../utils/expo.securestore";
import queryClient from "../../api/queryClient";
import { queryKeys, numbers } from "../../constants";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "../../types/common";

type RequestBody = {
    email: string;
    password: string;
};

function useSignUp (mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            router.push('/');
        },
        onError: (error: any) => {
            try {
                if (error.response.status === 409) {
                    console.log('이미 존재하는 계정입니다.');
                    Toast.show({
                        text1: '이미 존재하는 계정입니다.',
                        type: 'error',
                    });
                }

            } catch (e) {
                console.log('Error parsing:', e);
            }
        },
        ...mutationOptions,
    });
}

type User = {
    id: string;
    loginType: string;
    email: string;
    nickname?: string;
    profileImage?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
};

function useLogin(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
                await secureStorage.setItem('accessToken', data.tokens.accessToken);
                await secureStorage.setItem('refreshToken', data.tokens.refreshToken);
        },
        onSettled: () => {
            queryClient.fetchQuery({
                queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
            });
        },
        ...mutationOptions,
    });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            await secureStorage.removeItem('accessToken');
            await secureStorage.removeItem('refreshToken');
            queryClient.resetQueries({
                queryKey: [queryKeys.AUTH],
            });
            router.replace('/');
        },
        ...mutationOptions,
    });
}

function useGetMe(queryOptions?: UseQueryCustomOptions) {
    return useQuery({
        queryFn: getMe,
        queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
        ...queryOptions,
    });
}

function useGetRefreshToken() {
    const {data, isSuccess, isError, isPending} = useQuery({
        queryFn: getAccessToken,
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
        retry: false,
    });

    useEffect(() => {
        if (isSuccess) {
            secureStorage.setItem('accessToken', data.accessToken);
            if (data.refreshToken) {
                secureStorage.setItem('refreshToken', data.refreshToken);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            secureStorage.removeItem('accessToken');
            secureStorage.removeItem('refreshToken');
        }
    }, [isError]);

    return {isSuccess, isError, isPending};
}

function useAuth() {
    const signUpMutation = useSignUp();
    const refreshTokenQuery = useGetRefreshToken();
    const getMeQuery = useGetMe({
        enabled: refreshTokenQuery.isSuccess,
    });
    const isAuthenticated = getMeQuery.isSuccess;
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return {
        isAuthenticated,
        signUpMutation,
        loginMutation,
        logoutMutation,
        getMeQuery,
    }
}

export default useAuth;