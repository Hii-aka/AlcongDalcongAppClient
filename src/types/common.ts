import {HTTPError} from 'ky';
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

// ky의 HTTPError를 확장한 커스텀 에러 타입
type ResponseError = HTTPError & {
  response: {
    statusCode: string;
    message: string;
    error: string;
  };
};

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;


export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
