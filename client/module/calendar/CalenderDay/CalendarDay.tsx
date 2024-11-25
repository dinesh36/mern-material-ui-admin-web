import { Box, Grid, Typography } from '@mui/material';
import {
  calendarDayFont,
  dateAllNumber,
  DayCell,
  NoteTypography,
  selectedDateNumber,
  TodayDateBox,
} from './CalendarDay.style';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { PlanNote } from '../../../models/plan-note.type';
import { Plan } from '../../../models/plan.type';
import { getPlanStartEndDates } from '../../../utils/date-utils';
import appColors from '../../shared/appColor';
import { formatQty, getPaceLabel } from '../utils/getCurrentMonthDays';

type CalenderDayProps = {
  date: Dayjs;
  isPrevious?: boolean;
  isFuture?: boolean;
  note?: PlanNote;
  plan: Plan;
  selectedDate?: Dayjs | null;
  handleDateClick: (date: Dayjs, event: any) => void;
};

export const CalendarDay = ({
  date,
  note,
  handleDateClick,
  selectedDate,
  plan,
}: CalenderDayProps) => {
  const formattedDate = date.format('YYYY-MM-DD');
  const isSelectedDate = selectedDate?.isSame(date);
  const dateNumber = date.date();
  const today = dayjs();
  const isToday = today.isSame(date, 'day');
  const { planStartDate } = getPlanStartEndDates(plan);
  const isInRange = dayjs(date).isBetween(
    dayjs(planStartDate).subtract(1, 'second'),
    dayjs(planStartDate)
      .add(plan.weeks * 7 - 1, 'days')
      .add(1, 'second')
  );

  const colorCode =
    note?.colorCode === appColors.transparent
      ? appColors.black
      : note?.colorCode;

  return (
    <Grid item xs={12 / 7} key={`day-${formattedDate}`}>
      <DayCell
        isDisabled={!isInRange}
        bgColor={note?.colorCode}
        textColor={isInRange ? 'black' : 'darkgrey'}
        isSelectedDate={isSelectedDate}
        onClick={(event) => isInRange && handleDateClick(date, event)}
      >
        <Box>
          {isToday ? (
            <TodayDateBox>
              <Typography sx={dateAllNumber}>{dateNumber}</Typography>
            </TodayDateBox>
          ) : (
            <Box textAlign="left" ml="13px">
              <Typography sx={selectedDateNumber}>{dateNumber}</Typography>
            </Box>
          )}
          {isInRange && note && (
            <NoteTypography color={colorCode as string}>
              {note?.fields.map((field: any) => {
                const setReps = field?.reps ? `${field.reps} X ` : '';
                const qtyDisplay =
                  field.type === 'time' ? formatQty(field.qty) : field.qty;
                return (
                  <Typography key={field._id} sx={calendarDayFont}>
                    {`${setReps}  ${qtyDisplay} ${field.type} - ${getPaceLabel(field.pace)}`}
                  </Typography>
                );
              })}
            </NoteTypography>
          )}
        </Box>
      </DayCell>
    </Grid>
  );
};
