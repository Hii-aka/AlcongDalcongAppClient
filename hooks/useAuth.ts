import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

interface LoginData {
  email: string;
  password: string;
}

export function useAuth() {
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      // TODO: Implement actual login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      router.replace('/(main)/(tabs)/diary');
    },
  });

  return {
    loginMutation,
    isAuthenticated: false, // TODO: Implement actual auth state
  };
} 