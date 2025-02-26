import { router } from 'expo-router';
import React from 'react';
import {Pressable, StyleSheet, View, Text, PressableProps} from 'react-native';

interface CoupleTabProps extends PressableProps {
    isActive?: boolean;
    label: string;
}

function CoupleTab({isActive, label, ...props}: CoupleTabProps) {
  return (
    
    <Pressable 
    {...props}
    className={`flex-1 py-4 items-center border-b-2 ${isActive ? 'border-pink-500' : 'border-transparent'}`}>
      <Text className={`text-gray-500 font-semibold ${isActive ? 'text-pink-500' : 'text-gray-500'}`}>{label}</Text>
    </Pressable>
    
  )
}

const styles = StyleSheet.create({});

export default CoupleTab;