import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import regax from '@/constants/regax';
import { Input } from '../common/Input';
function EmailInput() {
    const {control, setFocus} = useFormContext();   
  return (
    <Controller
        control={control}
        name="email"
        rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
                value: regax.EMAIL,
                message: '이메일 형식이 올바르지 않습니다.',
            },
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
            <Input
                autoFocus
                label="이메일"
                placeholder="이메일을 입력해주세요."
                icon="mail"
                keyboardType="email-address"
                onChangeText={onChange}
                returnKeyType="next"
                submitBehavior="submit"
                autoCapitalize="none"
                onSubmitEditing={() => setFocus('password')}
                value={value}
                error={error?.message}
            />
        )}
    />
  )
}


export default EmailInput;
