import Constants from 'expo-constants';

export const getEnvVar = (name: string): string => {
  const value = Constants.expoConfig?.extra?.[name];
  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  }
  return value;
};