function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
}

function getDateWithSeparator(dateString: Date | string, separator: string = '-') {
  const { year, month, day } = getDateDetails(dateString);
  return `${year}${separator}${month.toString().padStart(2, '0')}${separator}${day.toString().padStart(2, '0')}`;
}

function getDateLocaleFormat(dateString: Date | string){
    const { year, month, day } = getDateDetails(dateString);
    return `${year}년 ${month}월 ${day}일`;
}

function getMonthYearDetails(initalDate: Date){
    const month = initalDate.getMonth() + 1;
    const year = initalDate.getFullYear();
    const startDate = new Date(`${year}-${month}`);
    const firstDayOfMonth = startDate.getDay();
    const lastDateString = String(new Date(year,month,0).getDate());
    const lastDate = Number(lastDateString);
    return { month, year, startDate, firstDayOfMonth, lastDate };
}

type MonthYear = {
    month: number;
    year: number;
    startDate: Date;
    firstDayOfMonth: number;
    lastDate: number;
}

function getNewMonthYear(prevMonthYear: MonthYear, increment: number){
    const newMonthYear = new Date(prevMonthYear.startDate.setMonth(prevMonthYear.startDate.getMonth() + increment));
    return getMonthYearDetails(newMonthYear);
}

function isSameAsCurrentDate(year: number, month: number, date: number){
    const currentDate = getDateWithSeparator(new Date());
    const targetDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    return currentDate === targetDate;
}

export { getDateDetails, getDateWithSeparator, getMonthYearDetails, getNewMonthYear, isSameAsCurrentDate };
export type { MonthYear };  