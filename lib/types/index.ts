// Anniversary related types
export interface Anniversary {
  days: number;
  date: Date;
  label: string;
}

export interface AnniversaryCalculatorProps {
  startDate: Date | string | null;
  onSelectDate?: (date: Anniversary) => void;
}

// Add other types here... 