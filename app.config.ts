import { ConfigContext, ExpoConfig } from 'expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "알콩달콩",
  slug: "alkongdalkong",
  extra: {
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
  },
});