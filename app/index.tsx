import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { router, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { styled } from 'nativewind';
import useAuth from '@/hooks/queries/useAuth';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledAnimatedView = styled(Animated.View)

export default function Index() {
  const bounceAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // 디버깅을 위한 로그 추가
    console.log('Authentication status:', isAuthenticated);
    
    const timer = setTimeout(() => {
      if (isAuthenticated === true) {
        console.log('Navigating to diary...');
        router.push('/(main)/(tabs)/diary');
      } else if (isAuthenticated === false) {
        console.log('Navigating to auth...');
        router.push('/(auth)');
      } else {
        console.log('Authentication status is undefined or null');
      }
    }, 2000); // 타이머 시간을 2초로 늘림

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  React.useEffect(() => {
    // 바운스 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 페이드인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <StyledView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#fbcfe8', '#f9a8d4', '#f472b6']}
        className="flex-1 items-center justify-center"
      >
        <StyledView className="absolute w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        
        <StyledAnimatedView className="z-10 items-center" style={{ opacity: fadeAnim }}>
          <StyledAnimatedView 
            className="flex-row items-center mb-8"
            style={{ transform: [{ translateY: bounceAnim }] }}
          >
            <FontAwesome name="heart" size={48} color="#000000" />
            <StyledText className="text-6xl font-bold mx-4">알콩달콩</StyledText>
            <FontAwesome name="heart" size={48} color="#000000" />
          </StyledAnimatedView>

          <StyledView className="flex-row justify-center items-center mb-8">
            <StyledView className="w-20 flex items-center">
              <FontAwesome name="book" size={32} color="#000000" />
            </StyledView>
            <StyledAnimatedView className="w-20 flex items-center" style={{ opacity: fadeAnim }}>
              <FontAwesome name="heart" size={32} color="#000000" />
            </StyledAnimatedView>
            <StyledView className="w-20 flex items-center">
              <FontAwesome name="pencil" size={32} color="#000000" />
            </StyledView>
          </StyledView>

          <StyledText className="text-2xl text-gray-600 tracking-wider text-center">
            Web Couple Diary
          </StyledText>
        </StyledAnimatedView>
      </LinearGradient>
    </StyledView>
  );
}