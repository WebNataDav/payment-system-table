import { monthNames, monthsToShow } from '@/constants';

export const handleMonthNavigation = (
  currentStartMonth: number,
  setCurrentStartMonth: React.Dispatch<React.SetStateAction<number>>,
  direction: 'left' | 'right'
) => {
  setCurrentStartMonth(prev => {
    if (direction === 'left') {
      return (prev - 1 + 12) % 12;
    } else {
      return (prev + 1) % 12;
    }
  });
};

export const getDisplayMonths = (currentStartMonth: number) => {
  const months = [];
  for (let i = 0; i < monthsToShow; i++) {
    const monthIndex = (currentStartMonth + i) % 12;
    months.push(monthNames[monthIndex]);
  }
  return months;
};