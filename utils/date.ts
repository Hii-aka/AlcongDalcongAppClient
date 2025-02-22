import { Anniversary } from '@/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.locale('ko');
dayjs.extend(relativeTime);

// 기본 포맷팅 함수들
export const formatDate = (date: Date | string) => dayjs(date).format('YYYY년 MM월 DD일');
export const formatDateTime = (date: Date | string) => dayjs(date).format('YYYY년 MM월 DD일 A h:mm');
export const formatTime = (date: Date | string) => dayjs(date).format('HH:mm');

// 날짜 비교 함수들
export const isToday = (date: Date | string) => dayjs(date).isSame(dayjs(), 'day');
export const isSameDay = (date1: Date | string, date2: Date | string) => 
  dayjs(date1).isSame(dayjs(date2), 'day');

interface DateDetails {
  year: number;
  month: number;
  day: number;
}

// 날짜 상세 정보 가져오기
export function getDateDetails(date: Date | string): DateDetails {
  const d = dayjs(date);
  return {
    year: d.year(),
    month: d.month() + 1, // dayjs는 0-based month를 사용하므로 1을 더함
    day: d.date()
  };
}

// 구분자로 구분된 날짜 문자열 반환
export function getDateWithSeparator(date: Date | string, separator: string = '-'): string {
  return dayjs(date).format(`YYYY${separator}MM${separator}DD`);
}

// 한국어 로케일 형식의 날짜 문자열 반환
export function getDateLocaleFormat(date: Date | string): string {
  return dayjs(date).format('YYYY년 MM월 DD일');
}

interface MonthYear {
  month: number;
  year: number;
  startDate: Date;
  firstDayOfMonth: number;
  lastDate: number;
}

// 월별 상세 정보 가져오기
export function getMonthYearDetails(initialDate: Date | string): MonthYear {
  const d = dayjs(initialDate);
  return {
    month: d.month() + 1,
    year: d.year(),
    startDate: d.startOf('month').toDate(),
    firstDayOfMonth: d.startOf('month').day(),
    lastDate: d.endOf('month').date()
  };
}

// 월 이동하기
export function getNewMonthYear(prevMonthYear: MonthYear, increment: number): MonthYear {
  const newDate = dayjs(prevMonthYear.startDate).add(increment, 'month');
  return getMonthYearDetails(newDate.toDate());
}

// 현재 날짜와 비교
export function isSameAsCurrentDate(year: number, month: number, date: number): boolean {
  const currentDate = dayjs();
  const targetDate = dayjs(`${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`);
  return currentDate.isSame(targetDate, 'day');
}

// 추가 유용한 함수들
export const addDays = (date: Date | string, days: number) => 
  dayjs(date).add(days, 'day').toDate();

export const subtractDays = (date: Date | string, days: number) => 
  dayjs(date).subtract(days, 'day').toDate();

export const getStartOfMonth = (date: Date | string) => 
  dayjs(date).startOf('month').toDate();

export const getEndOfMonth = (date: Date | string) => 
  dayjs(date).endOf('month').toDate();

export const getDayOfWeek = (date: Date | string) => 
  dayjs(date).format('dddd');

export const isWeekend = (date: Date | string) => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

export const getDaysInMonth = (date: Date | string) => 
  dayjs(date).daysInMonth();

export const getRelativeTime = (date: Date | string) => 
  dayjs(date).fromNow();

// 두 날짜 사이의 일수 차이 계산 (현재 날짜 기준)
export const getDaysDifference = (date: Date | string): number => {
  return dayjs().diff(dayjs(date), 'day') + 1;
};

// 특정 날짜로부터의 일수 차이 계산
export const getDaysBetween = (startDate: Date | string, endDate: Date | string): number => {
  return dayjs(endDate).diff(dayjs(startDate), 'day');
};

// 기념일 관련 함수들
export const SPECIAL_ANNIVERSARY_DAYS = [22, 50, 100, 200, 300, 365];

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

// 다음 기념일 계산
export function getNextAnniversary(startDate: Date | string | null): { daysUntil: number; nextAnniversary: Anniversary | null } {
  if (!startDate) {
    return { daysUntil: 0, nextAnniversary: null };
  }
  
  try { 
    const start = dayjs(startDate).startOf('day');
    if (!start.isValid()) {
      console.error('Invalid start date:', startDate);
      return { daysUntil: 0, nextAnniversary: null };
    }

    const today = dayjs().startOf('day');
    const daysPassed = today.diff(start, 'day') + 1; // 시작일 포함

    // 특별한 기념일 찾기
    const specialDays = [22, 50, 100, 200, 300, 365];
    let nextSpecialDay = specialDays.find(days => days > daysPassed);

    // 연간 기념일 확인
    if (!nextSpecialDay || nextSpecialDay === 365) {
      const yearsPassed = Math.floor(daysPassed / 365);
      const nextYear = yearsPassed + 1;
      if (nextYear <= 5) {
        nextSpecialDay = nextYear * 365;
      }
    }

    if (!nextSpecialDay) {
      console.log('No more anniversaries');
      return { daysUntil: 0, nextAnniversary: null };
    }

    const anniversaryDate = start.add(nextSpecialDay - 1, 'day');
    const daysUntil = anniversaryDate.diff(today, 'day');
    const label = nextSpecialDay === 365 ? '1주년' : 
                 nextSpecialDay > 365 ? `${nextSpecialDay / 365}주년` :
                 `${nextSpecialDay}일`;

    const nextAnniversary: Anniversary = {
      days: nextSpecialDay,
      date: anniversaryDate.toDate(),
      label
    };

    console.log('getNextAnniversary:', {
      startDate,
      daysPassed,
      nextSpecialDay,
      anniversaryDate: anniversaryDate.format(),
      daysUntil,
      label
    });

    return { daysUntil, nextAnniversary };
  } catch (error) {
    console.error('getNextAnniversary error:', error);
    return { daysUntil: 0, nextAnniversary: null };
  }
}

