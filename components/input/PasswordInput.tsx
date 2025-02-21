import React from 'react';
import { TextInputProps} from 'react-native';
import InputField from './InputField';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input } from '../common/Input';

type PasswordInputProps = {
    submitBehavior?: TextInputProps['submitBehavior'];
}

function PasswordInput({submitBehavior = 'blurAndSubmit'}: PasswordInputProps) {  
    const {control, setFocus} = useFormContext();       
  return (
    <Controller
        control={control}
        name="password"
        rules={{
            validate: (data: string) => {
                if (!data) return '비밀번호를 입력해주세요.';
                // 영문자, 숫자, 특수문자가 각각 최소 1개 이상 포함되어야 함
                const hasLetter = /[a-zA-Z]/.test(data);
                const hasNumber = /[0-9]/.test(data);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(data);
                
                if (!hasLetter || !hasNumber || !hasSpecial) {
                    return '비밀번호는 영문자, 숫자, 특수문자를 모두 포함해야 합니다.';
                }
                return true;
            },
        }}
        render={({field: {ref,onChange, value}, fieldState: {error}}) => (
            <Input
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                icon="lock-closed"
                inputMode="text"
                autoCapitalize="none"
                secureTextEntry
                onChangeText={onChange}
                returnKeyType="next"
                submitBehavior={submitBehavior}
                onSubmitEditing={() => setFocus('passwordConfirm')}
                value={value}
                error={error?.message}
            />
        )}
    />
  )
}


export default PasswordInput;   
