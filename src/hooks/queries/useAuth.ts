import { useMutation, useQuery } from "@tanstack/react-query";
import { signUp, login, getAccessToken } from "../../api/auth";
import { UseMutationCustomOptions } from "@/types/common";
import { queryKeys, numbers } from "@/constants";
import { useEffect } from "react";
import { secureStorage } from "@/utils/expoSecureStore";
function useSignUp(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: signUp,
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
            console.log('login success');
            await secureStorage.setItem('accessToken', data.data.tokens.accessToken);
            await secureStorage.setItem('refreshToken', data.data.tokens.refreshToken);
            console.log('accessToken', data.data.tokens.accessToken);
            console.log('refreshToken', data.data.tokens.refreshToken);
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
    const signUpMutation = useSignUp();
    const refreshTokenQuery = useGetRefreshToken();
    const loginMutation = useLogin();
    const isAuthenticated = loginMutation.isSuccess || refreshTokenQuery.isSuccess;
    const isLoginLoading = loginMutation.isPending || refreshTokenQuery.isPending;
    console.log('isAuthenticated', isAuthenticated);
    console.log('isLoginLoading', isLoginLoading);

    return {
        isAuthenticated,
        signUpMutation,
        loginMutation,
        isLoginLoading,
    }
}

export default useAuth;