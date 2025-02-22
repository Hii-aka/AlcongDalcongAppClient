import { addDays, addYears, format, differenceInDays, isValid } from 'date-fns';
import { Anniversary } from '@/types';

const SPECIAL_DAYS = [
  22, 50, 100, 200, 300, 365
];

function ensureValidDate(date: Date | string | number | null | undefined): Date | null {
  if (!date) return null;
  
  const parsedDate = new Date(date);
  return isValid(parsedDate) ? parsedDate : null;
}

export function calculateAnniversaryDates(startDate: Date | string | number | null): Anniversary[] {
  const validStartDate = ensureValidDate(startDate);
  if (!validStartDate) return [];

  const anniversaries: Anniversary[] = [];

  // Special day calculations
  SPECIAL_DAYS.forEach(days => {
    const date = addDays(validStartDate, days);
    const label = days === 365 
      ? '1주년' 
      : `${days}일`;
    
    anniversaries.push({
      days,
      date,
      label
    });
  });

  // Add yearly anniversaries (2년 ~ 5년)
  for (let year = 2; year <= 5; year++) {
    const date = addYears(validStartDate, year);
    anniversaries.push({
      days: year * 365,
      date,
      label: `${year}주년`
    });
  }

  return anniversaries.sort((a, b) => a.days - b.days);
}

export function formatDate(date: Date | string | number | null): string {
  const validDate = ensureValidDate(date);
  if (!validDate) return '-';
  return format(validDate, 'yyyy년 MM월 dd일');
}

export function getNextAnniversary(startDate: Date | string | number | null): { daysUntil: number; nextAnniversary: Anniversary } {
  const validStartDate = ensureValidDate(startDate);
  
  if (!validStartDate) {
    return {
      daysUntil: 0,
      nextAnniversary: { label: '시작일', days: 0, date: new Date() }
    };
  }

  const today = new Date();
  const anniversaries = calculateAnniversaryDates(validStartDate);
  
  // 오늘 이후의 가장 가까운 기념일 찾기
  const nextAnniversary = anniversaries.find(anniversary => 
    anniversary.date > today
  );

  if (!nextAnniversary) {
    // 모든 기념일이 지났다면 마지막 기념일 반환
    const lastAnniversary = anniversaries[anniversaries.length - 1];
    return {
      daysUntil: 0,
      nextAnniversary: lastAnniversary
    };
  }

  const daysUntil = differenceInDays(nextAnniversary.date, today);

  return {
    daysUntil,
    nextAnniversary
  };
}

const AnniversaryCalculator = {
  calculateAnniversaryDates,
  formatDate,
  getNextAnniversary,
};

export default AnniversaryCalculator; 