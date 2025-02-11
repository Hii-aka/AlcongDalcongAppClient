import React, {ReactNode} from 'react';
import {Pressable, PressableProps, Text} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

function HeaderButton({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) {
  return (
    <Pressable 
      disabled={hasError} 
      className="h-full items-center justify-center px-2.5"
      {...props}
    >
      {!labelText && icon}
      {!icon && labelText && (
        <Text 
          className={`text-base font-medium ${
            hasError ? 'text-gray-200' : 'text-custom'
          }`}
        >
          {labelText}
        </Text>
      )}
    </Pressable>
  );
}

export default HeaderButton;