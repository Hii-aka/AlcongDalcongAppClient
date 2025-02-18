import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import InputField from './InputField';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

function NicknameInput() {
    const {control, setFocus} = useFormContext();   
  return (
    <Controller
        control={control}
        name="nickname"
        rules={{
            required: '닉네임을 입력해주세요.',
            minLength: {
                value: 2,
                message: '닉네임은 2자 이상이어야 합니다.',
            },
            maxLength: {
                value: 10,
                message: '닉네임은 10자 이하여야 합니다.',
            },
            validate: (value: string) => {
                // 한글, 영문자, 숫자만 허용하고 첫 글자는 숫자가 아니어야 함
                if (!/^[a-zA-Z가-힣][a-zA-Z0-9가-힣]*$/.test(value)) {
                    return '닉네임은 한글, 영문자, 숫자만 사용 가능하며, 첫 글자는 숫자가 될 수 없습니다.';
                }
                return true;
            }
        }}
        render={({field: {ref, onChange, value}, fieldState: {error}}) => (
            <InputField
                ref={ref}
                label="닉네임"
                placeholder="닉네임을 입력해주세요."
                inputMode="text"
                onChangeText={onChange}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => setFocus('password')}
                value={value}
                error={error?.message}
            />
        )}
    />
  )
}


export default NicknameInput;   
