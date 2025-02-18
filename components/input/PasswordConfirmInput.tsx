import React from 'react';
import { TextInputProps} from 'react-native';
import InputField from './InputField';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';


function PasswordConfirmInput() {  
    const {control} = useFormContext();       
    const {watch} = useFormContext();
    const password = watch('password');
  return (
    <Controller
        control={control}
        name="passwordConfirm"
        rules={{
            validate: (data: string) => {
                if (!data) return '비밀번호를 입력해주세요.';
                if (data !== password) return '비밀번호가 일치하지 않습니다.';
                return true;
            },
        }}
        render={({field: {ref,onChange, value}, fieldState: {error}}) => (
            <InputField
                ref={ref}   
                label="비밀번호 확인"
                placeholder="비밀번호를 입력해주세요."
                inputMode="text"
                secureTextEntry
                onChangeText={onChange}
                textContentType="oneTimeCode"
                value={value}
                error={error?.message}
            />
        )}
    />
  )
}


export default PasswordConfirmInput;   
