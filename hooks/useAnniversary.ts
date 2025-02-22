import { useMemo, useEffect } from 'react';
import { calculateDaysTogether, getNextAnniversary } from '@/lib/utils/date';
import type { Anniversary } from '@/lib/types/anniversary';
import dayjs from 'dayjs';

export function useAnniversary(startDate: Date | string | null) {
  // startDate 유효성 검사
  const validatedStartDate = useMemo(() => {
    if (!startDate) return null;

    try {
      const date = startDate instanceof Date ? startDate : new Date(startDate);
      if (isNaN(date.getTime())) {
        console.warn('[useAnniversary] Invalid date:', startDate);
        return null;
      }
      return date;
    } catch (error) {
      console.error('[useAnniversary] Date validation error:', error);
      return null;
    }
  }, [startDate]);

  // 계산 결과
  const result = useMemo(() => {
    console.log('[useAnniversary] Calculation started:', {
      input: startDate,
      validated: validatedStartDate?.toISOString()
    });

    if (!validatedStartDate) {
      console.log('[useAnniversary] No valid start date');
      return {
        daysCount: 0,
        nextAnniversary: null,
        daysUntil: 0,
        isLoading: false,
        error: null
      };
    }

    try {
      // 함께한 일수 계산
      const days = calculateDaysTogether(validatedStartDate);
      
      // 다음 기념일 계산
      const { daysUntil, nextAnniversary } = getNextAnniversary(validatedStartDate);

      console.log('[useAnniversary] Calculation success:', {
        days,
        nextAnniversary: nextAnniversary ? {
          ...nextAnniversary,
          date: nextAnniversary.date.toISOString()
        } : null,
        daysUntil
      });

      return {
        daysCount: days,
        nextAnniversary,
        daysUntil,
        isLoading: false,
        error: null
      };
    } catch (error) {
      console.error('[useAnniversary] Calculation error:', error);
      return {
        daysCount: 0,
        nextAnniversary: null,
        daysUntil: 0,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Unknown error')
      };
    }
  }, [validatedStartDate]);

  // 결과 변경 감지
  useEffect(() => {
    console.log('[useAnniversary] Result updated:', {
      startDate: validatedStartDate?.toISOString(),
      ...result,
      nextAnniversary: result.nextAnniversary ? {
        ...result.nextAnniversary,
        date: result.nextAnniversary.date.toISOString()
      } : null
    });
  }, [validatedStartDate, result]);

  return result;
} 