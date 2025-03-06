import { StyleSheet, Platform } from 'react-native';

// 기본 간격 시스템
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 커플 다이어리 전용 색상 시스템
export const COLORS = {
  primary: '#FF7595',      // 메인 핑크
  secondary: '#A575FF',    // 소프트 퍼플
  accent: '#FF8C00',       // 피치 컬러
  background: '#FFFFFF',
  backgroundAlt: '#FFF0F5', // 연한 핑크 배경
  text: '#374151',
  textLight: '#6B7280',
  border: '#FFE4E9',       // 연한 핑크 보더
  error: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FFA000',
  // 커플 테마 전용 색상
  love: '#FF7595',         // 사랑을 표현하는 핑크
  memory: '#A575FF',       // 추억을 표현하는 퍼플
  date: '#FF8C00',         // 데이트를 표현하는 피치
  together: '#FFE4E9',     // 함께를 표현하는 연한 핑크
  special: '#FFC9D4',      // 특별한 날을 표현하는 중간 핑크
};

// 더 부드럽고 로맨틱한 그림자 효과
export const SHADOWS = {
  small: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
};

// 더 부드럽고 둥근 카드 스타일
export const CARD_STYLES = {
  borderRadius: 20,
  padding: SPACING.md,
  backgroundColor: COLORS.background,
  borderWidth: 1,
  borderColor: COLORS.border,
  ...SHADOWS.small,
};

// 더 감성적인 버튼 스타일
export const BUTTON_STYLES = {
  borderRadius: 16,
  padding: SPACING.md,
  minHeight: 48,
  borderWidth: 1,
  borderColor: 'transparent',
};

// 더 부드러운 입력 필드 스타일
export const INPUT_STYLES = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: COLORS.border,
  padding: SPACING.md,
  fontSize: 16,
  backgroundColor: COLORS.backgroundAlt,
};

// 타이포그래피 시스템
export const TYPOGRAPHY = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
};

// 테마 설정
export const theme = {
  colors: {
    primary: {
      50: '#FFF0F5',  // 라벤더 블러쉬
      100: '#FFE4E9',
      200: '#FFC9D4',
      300: '#FFADBF',
      400: '#FF91AA',
      500: '#FF7595', // 메인 핑크
      600: '#FF5983',
    },
    secondary: {
      50: '#F5F0FF',  // 소프트 라벤더
      100: '#EDE4FF',
      200: '#DBC9FF',
      300: '#C9ADFF',
      400: '#B791FF',
      500: '#A575FF', // 메인 퍼플
      600: '#9359FF',
    },
    accent: {
      50: '#FFF4E6',  // 피치
      100: '#FFE8CC',
      200: '#FFD199',
      300: '#FFBA66',
      400: '#FFA333',
      500: '#FF8C00', // 메인 피치
      600: '#FF7A00',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  spacing: SPACING,
  borderRadius: {
    sm: 8,    // 더 부드러운 모서리
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      '3xl': 30,
      '4xl': 36,
    },
  },
  shadows: StyleSheet.create({
    sm: SHADOWS.small,
    md: SHADOWS.medium,
  }),
  gradients: {
    primary: ['#FFF0F5', '#FFE4E9'],
    secondary: ['#F5F0FF', '#EDE4FF'],
    accent: ['#FFF4E6', '#FFE8CC'],
    love: ['#FF7595', '#FF5983'],
    couple: ['#A575FF', '#9359FF'],
  },
} as const;

export type Theme = typeof theme;

export const TAB_BAR = {
    HEIGHT: Platform.OS === 'ios' ? 65 : 60,
    BOTTOM_MARGIN: Platform.OS === 'ios' ? 20 : 16,
    TOTAL_HEIGHT: Platform.OS === 'ios' ? 85 : 76, // HEIGHT + BOTTOM_MARGIN
} as const; 