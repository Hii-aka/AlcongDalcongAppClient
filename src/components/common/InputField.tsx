import { mergeRefs } from '@/utils/common';
import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}

const InputField = forwardRef(
    (
        {disabled = false, error, touched, icon = null, ...props}: InputFieldProps,
        ref?: ForwardedRef<TextInput>,
    ) => {
      const innerRef = useRef<TextInput | null>(null);

      const handlePressInput = () => {
        innerRef.current?.focus();
      };

      return (
          <Pressable onPress={handlePressInput}>
           
                <TextInput
                    ref={ref ? mergeRefs(innerRef, ref) : innerRef}
                    editable={!disabled}
                    
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoCorrect={false}
                    {...props}
                />
              {touched && Boolean(error) && (
                  <Text 
                  className="text-red-500 text-sm"
                  >{error}</Text>
              )}
        
          </Pressable>
      );
    },
);

export default InputField;
