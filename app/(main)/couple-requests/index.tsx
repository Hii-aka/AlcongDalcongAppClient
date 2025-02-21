import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import CoupleRequestsList from '@/components/couple/CoupleRequestsList';

export default function CoupleRequestsPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: '커플 신청',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      <View style={styles.content}>
        <CoupleRequestsList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
}); 