import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Anniversary } from '../types/anniversary';

dayjs.locale('ko');
dayjs.extend(relativeTime);

// 함께한 일수 계산 (시작일부터 오늘까지)
export function calculateDaysTogether(startDate: Date | string | null): number {
  if (!startDate) return 0;
  
  try {
    const start = dayjs(startDate).startOf('day');
    if (!start.isValid()) {
      console.error('Invalid start date:', startDate);
      return 0;
    }

    const today = dayjs().startOf('day');
    const days = today.diff(start, 'day') + 1; // 시작일 포함

    console.log('calculateDaysTogether:', {
      startDate,
      start: start.format(),
      today: today.format(),
      days
    });

    return days;
  } catch (error) {
    console.error('calculateDaysTogether error:', error);
    return 0;
  }
}

// 특정 날짜로부터의 기념일 목록 계산
export function calculateAnniversaryDates(startDate: Date | string | null): Anniversary[] {
  if (!startDate) return [];
  
  const start = dayjs(startDate).startOf('day');
  if (!start.isValid()) return [];

  const anniversaries: Anniversary[] = [];

  // 특별한 날짜 기념일
  SPECIAL_ANNIVERSARY_DAYS.forEach(days => {
    // 시작일을 포함하므로 days - 1을 더함
    const date = start.add(days - 1, 'day').toDate();
    const label = days === 365 ? '1주년' : `${days}일`;
    anniversaries.push({ days, date, label });
  });

  // 연간 기념일 (2~5주년)
  for (let year = 2; year <= 5; year++) {
    const date = start.add(year, 'year').subtract(1, 'day').toDate();
    anniversaries.push({
      days: year * 365,
      date,
      label: `${year}주년`
    });
  }

  return anniversaries.sort((a, b) => a.days - b.days);
}

// 다음 기념일 계산
export function getNextAnniversary(startDate: Date | string | null): { daysUntil: number; nextAnniversary: Anniversary | null } {
  if (!startDate) return { daysUntil: 0, nextAnniversary: null };
  
  const start = dayjs(startDate).startOf('day');
  if (!start.isValid()) return { daysUntil: 0, nextAnniversary: null };

  const today = dayjs().startOf('day');
  const anniversaries = calculateAnniversaryDates(startDate);
  
  // 오늘 이후의 가장 가까운 기념일 찾기
  const nextAnniversary = anniversaries.find(anniversary => 
    dayjs(anniversary.date).startOf('day').isAfter(today, 'day')
  );

  if (!nextAnniversary) {
    const lastAnniversary = anniversaries[anniversaries.length - 1];
    return {
      daysUntil: 0,
      nextAnniversary: lastAnniversary
    };
  }

  // 시작일부터 다음 기념일까지의 남은 일수 계산
  const daysUntil = dayjs(nextAnniversary.date).startOf('day').diff(today, 'day');

  return {
    daysUntil,
    nextAnniversary
  };
}

export const SPECIAL_ANNIVERSARY_DAYS = [22, 50, 100, 200, 300, 365]; 