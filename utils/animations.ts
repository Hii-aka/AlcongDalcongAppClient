import { Animated, Easing } from 'react-native';

export const fadeIn = (value: Animated.Value) => {
  return Animated.timing(value, {
    toValue: 1,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: true,
  });
};

export const fadeOut = (value: Animated.Value) => {
  return Animated.timing(value, {
    toValue: 0,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: true,
  });
};

export const scaleIn = (value: Animated.Value) => {
  return Animated.spring(value, {
    toValue: 1,
    useNativeDriver: true,
    damping: 15,
    mass: 1,
    stiffness: 150,
  });
};

export const scaleOut = (value: Animated.Value) => {
  return Animated.spring(value, {
    toValue: 0.95,
    useNativeDriver: true,
    damping: 15,
    mass: 1,
    stiffness: 150,
  });
};

export const slideUp = (value: Animated.Value) => {
  return Animated.spring(value, {
    toValue: 0,
    useNativeDriver: true,
    damping: 15,
    mass: 1,
    stiffness: 150,
  });
};

export const slideDown = (value: Animated.Value) => {
  return Animated.spring(value, {
    toValue: 100,
    useNativeDriver: true,
    damping: 15,
    mass: 1,
    stiffness: 150,
  });
};

// Heart beat animation for like buttons
export const heartBeat = (value: Animated.Value) => {
  return Animated.sequence([
    Animated.spring(value, {
      toValue: 1.2,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }),
    Animated.spring(value, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      mass: 1,
      stiffness: 150,
    }),
  ]);
};

// Floating animation for elements that need to hover
export const float = (value: Animated.Value) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1.05,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 0.95,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  );
}; 