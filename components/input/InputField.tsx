import React, {ReactNode, ForwardedRef, forwardRef} from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  Pressable,
  View,
} from 'react-native';


interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
  label?: string;
}

function InputField({
  disabled = false,
   error, 
   icon = null, 
   label, 
   ...props
  }: InputFieldProps, ref: ForwardedRef<TextInput>) {

      const handlePressInput = () => {
      };

      return (
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
          <Pressable onPress={handlePressInput}>
                <TextInput
                    ref={ref}
                    editable={!disabled}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoCorrect={false}
                    {...props}
                />
              {Boolean(error) && (
                  <Text className="text-red-500 text-sm">{error}</Text>
              )}
          </Pressable>
        </View>
      );
}

export default forwardRef(InputField);