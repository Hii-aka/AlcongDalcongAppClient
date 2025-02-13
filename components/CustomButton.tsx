import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface CustomButtonProps extends  PressableProps{
  label: string;
  variant?: "filled" | "outlined";
}

function CustomButton({label, variant = "filled", ...props}: CustomButtonProps) {
  return (
    <Pressable 
    className={
        `w-full py-2 
        px-4 
        rounded-md 
        active:opacity-80 
        ${variant === "filled" ? "bg-black" : "bg-transparent border border-black"}`
    }
    style={({ pressed }) => [pressed && styles.pressed]}
    {...props}
  >
     <Text className={
        `text-center 
        font-bold 
        ${variant === "filled" ? "text-white" : "text-black"}`
        }>{label}</Text>
  </Pressable>
  )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
});

export default CustomButton;