import dayjs, { Dayjs } from 'dayjs';
import { Plan } from '../plan/plan.type';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const getPlanStartEndDates = (plan: Plan) => {
  const planStartDate = dayjs(plan.startDate).startOf('day');
  const planEndDate = dayjs(planStartDate).add(plan.weeks * 7 - 1, 'day');
  return { planStartDate, planEndDate };
};

export const getplanMonths = (plan: Plan) => {
  const months = new Set();
  const { planStartDate } = getPlanStartEndDates(plan);
  for (let i = 0; i < plan.weeks * 7 - 1; i++) {
    months.add(
      dayjs(planStartDate).add(i, 'day').startOf('month').format('YYYY-MM')
    );
  }
  // @ts-ignore
  return Array.from(months).map((month: string) => dayjs(month));
};

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

export const getWeekDisplayCounter = ({
  plan,
  currentMonth,
  currentMonthDays,
}: {
  currentMonthDays: Dayjs[];
  plan: Plan;
  currentMonth: Dayjs;
}) => {
  const { planStartDate, planEndDate } = getPlanStartEndDates(plan);
  const totalWeeks = currentMonthDays.length / 7;
  let startWeekIndex = 0;
  let endWeekIndex = 1;
  for (let i = 0; i < totalWeeks; i++) {
    const weekStartDate = currentMonthDays[0].add(7 * i, 'day');
    const weekEndDate = currentMonthDays[0].add(7 * i + 6, 'day');
    if (
      weekStartDate.isBetween(
        dayjs(planStartDate).subtract(1, 'second'),
        dayjs(planEndDate).add(1, 'second')
      ) ||
      weekEndDate.isBetween(
        dayjs(planStartDate).subtract(1, 'second'),
        dayjs(planEndDate).add(1, 'second')
      )
    ) {
      if (!startWeekIndex) {
        startWeekIndex = i + 1;
      }
      endWeekIndex++;
    }
    if (!startWeekIndex) {
      endWeekIndex++;
    }
  }
  let previousMonthWeeks = 0;
  if (!planStartDate.startOf('month').isSame(currentMonth)) {
    previousMonthWeeks = Math.floor(
      (currentMonth.diff(planStartDate, 'days') + planStartDate.day() + 1) / 7
    );
  }

  let weekDisplayCount = 1;
  return [...Array(totalWeeks)].map((_, i) => {
    const weekIndex = i + 1;
    let weekText = '';
    if (weekIndex >= startWeekIndex && weekIndex < endWeekIndex) {
      weekText = `Week ${weekDisplayCount + previousMonthWeeks}`;
      weekDisplayCount += 1;
    }
    return weekText;
  });
};
