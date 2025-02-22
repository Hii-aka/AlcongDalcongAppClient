import React, { useMemo, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAnniversary } from '../../hooks/useAnniversary';
import type { Anniversary } from '@/lib/types/anniversary';
import dayjs from 'dayjs';

interface ProfileCardProps {
  startDate?: Date | string | null;
}

export function ProfileCard({ startDate = null }: ProfileCardProps) {
  // startDate 유효성 검사 및 변환
  const validStartDate = useMemo(() => {
    console.log('[ProfileCard] Raw startDate:', startDate, typeof startDate);
    
    if (!startDate) {
      console.log('[ProfileCard] No startDate provided');
      return null;
    }

    try {
      // string인 경우 (YYYY-MM-DD 형식 처리)
      if (typeof startDate === 'string') {
        // firstMetDate는 YYYY-MM-DD 형식으로 옴
        const [year, month, day] = startDate.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day); // month는 0-based
        
        if (isNaN(parsedDate.getTime())) {
          console.warn('[ProfileCard] Invalid date string format:', startDate);
          return null;
        }
        
        console.log('[ProfileCard] Parsed date from string:', {
          input: startDate,
          parsed: parsedDate.toISOString(),
          year,
          month,
          day
        });
        
        return parsedDate;
      }

      // Date 객체인 경우
      if (startDate instanceof Date) {
        if (isNaN(startDate.getTime())) {
          console.warn('[ProfileCard] Invalid Date object:', startDate);
          return null;
        }
        console.log('[ProfileCard] Valid Date object:', startDate.toISOString());
        return startDate;
      }

      console.warn('[ProfileCard] Unexpected startDate type:', typeof startDate);
      return null;
    } catch (error) {
      console.error('[ProfileCard] Date parsing error:', error);
      return null;
    }
  }, [startDate]);

  // startDate가 변경될 때마다 로그
  useEffect(() => {
    console.log('[ProfileCard] Date validation effect:', {
      input: startDate,
      inputType: typeof startDate,
      validated: validStartDate,
      isValid: validStartDate !== null,
      validTimestamp: validStartDate?.getTime()
    });
  }, [startDate, validStartDate]);

  const {
    daysCount,
    nextAnniversary,
    daysUntil,
    isLoading,
    error
  } = useAnniversary(validStartDate);

  // 디버깅 로그
  useEffect(() => {
    console.log('[ProfileCard] Anniversary calculation result:', {
      validStartDate: validStartDate?.toISOString(),
      daysCount,
      nextAnniversary: nextAnniversary ? {
        ...nextAnniversary,
        date: nextAnniversary.date.toISOString()
      } : null,
      daysUntil,
      isLoading,
      error
    });
  }, [validStartDate, daysCount, nextAnniversary, daysUntil, isLoading, error]);

  // 에러 상태 표시
  if (error) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[COLORS.love + '20', COLORS.background]}
          style={styles.card}
        >
          <Text style={[styles.statValue, { color: COLORS.error }]}>
            날짜 계산 중 오류가 발생했습니다
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.love + '20', COLORS.background]}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Pressable style={styles.profile}>
              <Image
                source={{ uri: 'https://picsum.photos/200' }}
                style={styles.profileImage}
              />
              <View style={styles.badge}>
                <Ionicons name="heart" size={12} color={COLORS.background} />
              </View>
            </Pressable>
            <View style={styles.divider}>
              <Ionicons name="heart" size={20} color={COLORS.love} />
            </View>
            <Pressable style={styles.profile}>
              <Image
                source={{ uri: 'https://picsum.photos/201' }}
                style={styles.profileImage}
              />
              <View style={styles.badge}>
                <Ionicons name="heart" size={12} color={COLORS.background} />
              </View>
            </Pressable>
          </View>
          <Pressable style={styles.editButton}>
            <Ionicons name="pencil" size={16} color={COLORS.love} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.stat}>
            {isLoading ? (
              <ActivityIndicator color={COLORS.love} />
            ) : (
              <>
                <Text style={styles.statValue}>{daysCount > 0 ? daysCount : '-'}</Text>
                <Text style={styles.statLabel}>함께한 일수</Text>
              </>
            )}
          </View>
          <View style={styles.dividerVertical} />
          <View style={styles.stat}>
            {isLoading ? (
              <ActivityIndicator color={COLORS.love} />
            ) : (
              <>
                <Text style={styles.statValue}>
                  {nextAnniversary ? `D-${daysUntil}` : '-'}
                </Text>
                <Text style={styles.statLabel}>
                  {nextAnniversary ? `${nextAnniversary.label}까지` : '시작일 설정 필요'}
                </Text>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  card: {
    borderRadius: 24,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  profile: {
    position: 'relative',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.love,
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.love,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  divider: {
    width: 32,
    alignItems: 'center',
  },
  editButton: {
    padding: SPACING.xs,
    backgroundColor: COLORS.love + '20',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: SPACING.sm,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.love,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  dividerVertical: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
});