import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 캐시 설정
      staleTime: 60 * 1000, // 1분
      gcTime: 5 * 60 * 1000, // 5분
      // 에러 발생 시 재시도 설정
      retry: 2,
      retryDelay: 1000,
      // 초기 로딩 상태 설정
      suspense: false,
      // 에러 발생 시 자동 재시도
      useErrorBoundary: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        {/* 기존 앱 컴포넌트들 */}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
} 