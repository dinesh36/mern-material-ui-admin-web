import { Dayjs } from 'dayjs';
import { NOTE_FORM_PACE_OPTIONS } from '../CalendarNoteModal/constants';

const previousMonthDays = (month: Dayjs) => {
  const startOfMonth = month.startOf('month');
  const firstDayOfMonth = startOfMonth.day();
  const previousMonthDays = [];

  for (let i = firstDayOfMonth; i > 0; i--) {
    previousMonthDays.push(month.subtract(i, 'day'));
  }
  return previousMonthDays;
};

const currentMonthDays = (month: Dayjs) => {
  const daysInMonth = month.daysInMonth();
  const currentMonthDays = [];

  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(month.date(i));
  }
  return currentMonthDays;
};

const getNextMonthDays = (month: Dayjs) => {
  const endOfMonth = month.endOf('month');
  const lastDayOfMonth = endOfMonth.day() + 1;
  const nextMonth = month.add(1, 'month');
  const nextMonthDays = [];

  let dateCount = 0;
  for (let i = lastDayOfMonth; i < 7; i++) {
    nextMonthDays.push(nextMonth.add(dateCount++, 'day'));
  }
  return nextMonthDays;
};

export const getCurrentMonthDays = (month: Dayjs) => {
  return [
    ...previousMonthDays(month),
    ...currentMonthDays(month),
    ...getNextMonthDays(month),
  ];
};

export const formatQty = (qty: string): string => {
  if (qty.startsWith('00:')) {
    return qty.slice(3);
  }
  return qty;
};

export const getPaceLabel = (pace: string) => {
  const paceOption = NOTE_FORM_PACE_OPTIONS.find(
    (option) => option.value === pace
  );
  return paceOption ? paceOption.label : null;
};
