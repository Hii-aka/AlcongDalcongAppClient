import { StyleSheet } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import RootNavigator from '@/navigations/root/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
