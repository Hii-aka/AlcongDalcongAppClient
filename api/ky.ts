import ky from 'ky';
import { Platform } from 'react-native';
import { secureStorage } from '../utils/expo.securestore';
import { getAccessToken } from './auth';
  const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:3000' 
  : 'http://localhost:3000';

export const client = ky.create({
  prefixUrl: BASE_URL,
  credentials: 'include', // withCredentials와 동일
  timeout: false,
  hooks: {
    beforeRequest: [
      async (request) => {
        // 필요한 헤더 추가
        request.headers.set('Content-Type', 'application/json');
        const accessToken = await secureStorage.getItem('accessToken');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        // 응답 처리
        if (!response.ok) {
          // 에러 처리
        }
        if (response.status === 401) {
          // useAuth 훅 대신 직접 refresh 토큰 로직을 구현
          try {
            const refreshToken = await secureStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await fetch(`${BASE_URL}/auth/refresh`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${refreshToken}`,
                },
              });
              
              if (response.ok) {
                const { data } = await response.json();
                if (data.accessToken) {
                  await secureStorage.setItem('accessToken', data.accessToken);
                }
                if (data.refreshToken) {
                  await secureStorage.setItem('refreshToken', data.refreshToken);
                }
                request.headers.set('Authorization', `Bearer ${data.accessToken}`);
                return client(request);
              }
            }
          } catch (error) {
            console.error('Token refresh failed:', error);
          }
        }
        return response;
      }
    ]
  }
});

export const api = {
  // GET 요청
  async get<T>(endpoint: string, options?: { headers?: Record<string, string> }) {
    return client.get(endpoint, {
      headers: options?.headers,
    }).json<T>();
  },

  // POST 요청
  async post<T>(endpoint: string, data?: unknown) {
    return client.post(endpoint, { json: data }).json<T>();
  },

  // PUT 요청
  async put<T>(endpoint: string, data?: unknown) {
    return client.put(endpoint, { json: data }).json<T>();
  },

  // DELETE 요청
  async delete<T>(endpoint: string) {
    return client.delete(endpoint).json<T>();
  }
};