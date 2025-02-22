export interface Anniversary {
  days: number;
  date: Date;
  label: string;
}

export interface AnniversaryCalculatorProps {
  startDate: Date | string | null;
  onSelectDate?: (date: Anniversary) => void;
} 