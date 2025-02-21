import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../hooks/queries/useAuth';
import { router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';
import { Button } from '../../components/common/Button';
import Toast from 'react-native-toast-message';
import PasswordInput from '../../components/input/PasswordInput';
import EmailInput from '../../components/input/EmailInput';
type LoginForm = {
  email: string;
  password: string;
};

export default function AuthHome() {
  const {loginMutation, isAuthenticated} = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/(main)/(tabs)/diary');
    }
  }, [isAuthenticated]);

  const loginForm = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginForm) => {
    const {email, password} = data;
    loginMutation.mutate({email, password}, {
      onSuccess: () => {
        router.push('/(main)/(tabs)/diary');
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: '로그인에 실패했습니다',
          text2: '이메일과 비밀번호를 확인해주세요',
        });
      }
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.backgroundAlt, COLORS.background]}
        style={{ flex: 1 }}
      >
        <View style={{ 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: SPACING.xl 
        }}>
          <View style={{ width: '100%', maxWidth: 360 }}>
            <View style={{ alignItems: 'center', marginBottom: SPACING.xl }}>
              <View style={[
                { 
                  width: 80, 
                  height: 80, 
                  marginBottom: SPACING.md,
                  borderRadius: 24,
                  backgroundColor: COLORS.love,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                SHADOWS.medium
              ]}>
                <Ionicons 
                  name="heart" 
                  size={40} 
                  color={COLORS.background}
                />
              </View>
              <Text style={{ 
                fontSize: 32,
                fontWeight: 'bold',
                color: COLORS.text,
                marginBottom: SPACING.xs,
              }}>
                알콩달콩
              </Text>
              <Text style={{ 
                fontSize: 16,
                color: COLORS.textLight,
                textAlign: 'center',
                lineHeight: 24,
              }}>
                소중한 추억을 기록하는{'\n'}커플 다이어리
              </Text>
            </View>

            <View style={[
              { 
                backgroundColor: COLORS.background,
                borderRadius: 24,
                padding: SPACING.xl,
                borderWidth: 1,
                borderColor: COLORS.border,
              },
              SHADOWS.small
            ]}>
              <FormProvider {...loginForm}>
              <View style={{ gap: SPACING.md }}>
                <EmailInput />
                <PasswordInput />
                <Button
                  onPress={loginForm.handleSubmit(onSubmit)}
                  title="로그인"
                  variant="love"
                  size="large"
                  icon="log-in"
                  isLoading={loginMutation.isPending}
                />
              </View>
              </FormProvider>
              {loginMutation.isError && (
                <View style={{ 
                  marginTop: SPACING.sm,
                  backgroundColor: COLORS.error + '15',
                  borderRadius: 12,
                  padding: SPACING.sm,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SPACING.xs,
                }}>
                  <Ionicons name="alert-circle" size={20} color={COLORS.error} />
                  <Text style={{ color: COLORS.error, fontSize: 14 }}>
                    이메일 또는 비밀번호가 올바르지 않습니다
                  </Text>
                </View>
              )}
            </View>

            <View style={{ 
              marginTop: SPACING.xl,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: COLORS.textLight, marginRight: SPACING.xs }}>
                아직 회원이 아니신가요?
              </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity 
                  style={{
                    backgroundColor: COLORS.backgroundAlt,
                    paddingHorizontal: SPACING.sm,
                    paddingVertical: SPACING.xs,
                    borderRadius: 99,
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={{ 
                    fontWeight: '600',
                    color: COLORS.love,
                  }}>
                    회원가입
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            <View style={{ 
              marginTop: SPACING.md,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <TouchableOpacity 
                style={{
                  paddingHorizontal: SPACING.md,
                  paddingVertical: SPACING.xs,
                }}
                activeOpacity={0.7}
              >
                <Text style={{ 
                  fontSize: 14,
                  color: COLORS.textLight,
                }}>
                  비밀번호 찾기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
} 