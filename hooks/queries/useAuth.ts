import { useMutation, useQuery } from "@tanstack/react-query";
import { signUpMale, signUpFemale, login, getAccessToken, logout } from "../../api/auth";
import { useEffect } from "react";
import { secureStorage } from "../../utils/expo.securestore";
import queryClient from "../../api/query.client";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "../../types/common";
import { queryKeys, numbers } from "../../constants";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
function useSignUpMale (mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: signUpMale,
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

function useSignUpFemale(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: signUpFemale,
        onSuccess: () => {
            router.push('/');
        },
        onError: (error: any) => {
            try {
                if (error.response.status === 409) {
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

type LoginResponse = {
    data: {
        user: User;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    };
};

function useLogin(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: login,
        onSuccess: async (data: LoginResponse) => {
            await secureStorage.setItem('accessToken', data.data.tokens.accessToken);
            await secureStorage.setItem('refreshToken', data.data.tokens.refreshToken);
        },
        onSettled: () => {
            queryClient.refetchQueries({
                queryKey: [queryKeys.AUTH],
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
        },
        ...mutationOptions,
    });
}

function useGetRefreshToken() {
    const {data, isSuccess, isError, isPending} = useQuery({
        queryFn: getAccessToken,
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        (async () => {
            if (isSuccess && data?.data) {
                await secureStorage.setItem('accessToken', data.data.accessToken);
                await secureStorage.setItem('refreshToken', data.data.refreshToken);
            }
        })();
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) {
            console.log('refresh token error');
            secureStorage.removeItem('accessToken');
            secureStorage.removeItem('refreshToken');
        }
    }, [isError]);
    return {
        isSuccess,
        isError,
        isPending,
    }
}

function useAuth() {
    const signUpMaleMutation = useSignUpMale();
    const signUpFemaleMutation = useSignUpFemale();
    const refreshTokenQuery = useGetRefreshToken();
    const loginMutation = useLogin();
    const isAuthenticated = loginMutation.isSuccess || refreshTokenQuery.isSuccess;
    const isLoginLoading = loginMutation.isPending || refreshTokenQuery.isPending;
    console.log('isAuthenticated', isAuthenticated);
    console.log('isLoginLoading', isLoginLoading);
    const logoutMutation = useLogout();

    return {
        isAuthenticated,
        signUpMaleMutation,
        signUpFemaleMutation,
        loginMutation,
        isLoginLoading,
        logoutMutation,
    }
}

export default useAuth;