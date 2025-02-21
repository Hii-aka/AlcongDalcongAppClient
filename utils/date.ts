import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

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