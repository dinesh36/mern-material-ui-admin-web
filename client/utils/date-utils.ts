import dayjs, { Dayjs } from 'dayjs';
import { Plan } from '../models/plan.type';
import { PlanNote } from '../models/plan-note.type';

export const getPlanDateString = (date: string) => {
  return dayjs(date).format('DD MMM');
};

export const getFormDateString = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const getPlanStartEndDates = (plan: Plan) => {
  const planStartDate = dayjs(plan.startDate).startOf('day');
  const planEndDate = dayjs(planStartDate).add(plan.weeks * 7 - 1, 'day');
  return { planStartDate, planEndDate };
};

export const getplanMonths = (plan: Plan) => {
  const months = new Set();
  for (let i = 0; i < plan.weeks * 7 - 1; i++) {
    months.add(
      dayjs(plan.startDate).add(i, 'day').startOf('month').format('YYYY-MM')
    );
  }
  // @ts-ignore
  return Array.from(months).map((month: string) => dayjs(month));
};

export const getWeekDisplayCounter = ({
  plan,
  currentMonth,
  currentMonthDays,
  planNotes,
}: {
  currentMonthDays: Dayjs[];
  plan: Plan;
  currentMonth: Dayjs;
  planNotes: PlanNote[];
  isCalendarView: boolean;
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

  const fetchWeeklyTotal = (weekStart: Dayjs, weekEnd: Dayjs) => {
    const conversions = {
      miles: { miles: 1, kilometers: 0.621371, meters: 0.000621371 },
      kilometers: { miles: 1.60934, kilometers: 1, meters: 0.001 },
    };

    let totalDistanceMiles = 0;
    let totalDistanceKms = 0;
    let totalTimeSeconds = 0;
    let totalOther = 0;

    planNotes
      .filter((note) =>
        dayjs(note.date).isBetween(weekStart, weekEnd, null, '[]')
      )
      .forEach((record) => {
        record.fields.forEach((field) => {
          const qty = Number(field.qty) || 0;
          const reps = Number(field.reps) || 1;

          if (
            field.type === 'miles' ||
            field.type === 'kilometers' ||
            field.type === 'meters'
          ) {
            totalDistanceMiles +=
              qty *
              reps *
              conversions.miles[field.type as keyof typeof conversions.miles];
            totalDistanceKms +=
              qty *
              reps *
              conversions.kilometers[
                field.type as keyof typeof conversions.kilometers
              ];
          } else if (field.type === 'time') {
            const [hours, minutes, seconds] = field.qty.split(':').map(Number);
            totalTimeSeconds +=
              (hours * 3600 + minutes * 60 + (seconds || 0)) * reps;
          } else {
            totalOther += qty * reps;
          }
        });
      });

    const totalHours = Math.floor(totalTimeSeconds / 3600);
    const totalMinutes = Math.floor((totalTimeSeconds % 3600) / 60);
    const totalSeconds = totalTimeSeconds % 60;

    let totalTime = '';
    if (totalTimeSeconds > 0) {
      totalTime =
        totalHours > 0
          ? `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`
          : `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    }

    return {
      totalDistanceMiles: parseFloat(totalDistanceMiles.toFixed(5)),
      totalDistanceKms: parseFloat(totalDistanceKms.toFixed(5)),
      totalTime,
      totalOther,
    };
  };

  let weekDisplayCount = 1;
  return [...Array(totalWeeks)].map((_, i) => {
    const weekIndex = i + 1;
    const userMeasurementType = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).measurementType;
    let weekCounter;
    let totalDistance;
    let totalTime;
    let totalOther;
    if (weekIndex >= startWeekIndex && weekIndex < endWeekIndex) {
      const weekStartDate = currentMonthDays[0].add(7 * i, 'day');
      const weekEndDate = currentMonthDays[0].add(7 * i + 6, 'day');
      weekCounter = weekDisplayCount + previousMonthWeeks;
      weekDisplayCount += 1;
      const {
        totalDistanceMiles,
        totalDistanceKms,
        totalTime: totalTimeFetched,
        totalOther: totalOtherFetched,
      } = fetchWeeklyTotal(weekStartDate, weekEndDate);
      totalTime = totalTimeFetched ? totalTimeFetched : undefined;
      totalOther = totalOtherFetched ? totalOtherFetched : undefined;
      totalDistance =
        userMeasurementType === 'KMs' ? totalDistanceKms : totalDistanceMiles;
      totalDistance = totalDistance ? totalDistance : undefined;
    }
    return {
      weekCounter,
      totalDistance,
      userMeasurementType:
        userMeasurementType === 'miles' ? 'Miles' : userMeasurementType,
      totalTime,
      totalOther,
    };
  });
};
