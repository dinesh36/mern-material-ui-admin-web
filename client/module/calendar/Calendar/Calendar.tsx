import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import {
  CalendarBoxContainer,
  CalendarContainer,
  CalendarDayStyle,
  CalendarDayTypography,
  CalendarHeader,
  CalenderHerderFontSize,
  weekCountStyle,
  weekTotalStyle,
} from './Calendar.style';
import { PreviousIcon } from '../../icons/PreviousIcon';
import { NextIcon } from '../../icons/NextIcon';
import { CalendarNoteModal } from '../CalendarNoteModal/CalendarNoteModal';
import ExportButtons from '../ExportButtons';
import { Plan } from '../../../models/plan.type';
import { CalendarDay } from '../CalenderDay/CalendarDay';
import { getCurrentMonthDays } from '../utils/getCurrentMonthDays';
import { DAYS_OF_WEEK } from '../calendar.constant';
import { PlanNote } from '../../../models/plan-note.type';
import {
  getWeekDisplayCounter,
  getPlanStartEndDates,
} from '../../../utils/date-utils';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

interface PlanCalendarProps {
  plan: Plan;
  planNotes: PlanNote[];
  isShared?: boolean;
  fetchPlanNotes: () => void;
}

const PlanCalendar: React.FC<PlanCalendarProps> = ({
  plan,
  planNotes,
  fetchPlanNotes,
  isShared,
}) => {
  const { planStartDate, planEndDate } = getPlanStartEndDates(plan);
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const currentMonthDays = useMemo(() => {
    return getCurrentMonthDays(currentMonth);
  }, [currentMonth]);

  useEffect(() => {
    setCurrentMonth(
      dayjs().isBetween(planStartDate, planEndDate)
        ? dayjs().startOf('month')
        : planStartDate.startOf('month')
    );
    // eslint-disable-next-line
  }, []);

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const getMatchingNote = (date: Dayjs) => {
    return planNotes.find((note) => date.isSame(note.date, 'day'));
  };

  const getFormattedDate = (date: Dayjs) => date.format('YYYY-MM-DD');

  const handleDateClick = (
    date: Dayjs,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setAnchorPosition({
      top: rect.top,
      left: rect.left + window.scrollX - 373,
    });
    setSelectedDate(date);
  };

  const renderCalendarDays = () =>
    currentMonthDays.map((date) => (
      <CalendarDay
        key={getFormattedDate(date)}
        selectedDate={selectedDate}
        date={date}
        plan={plan}
        handleDateClick={handleDateClick}
        note={getMatchingNote(date)}
      />
    ));

  const renderCalendarHeader = () => {
    const isNextMonthEnabled = dayjs(currentMonth)
      .add(1, 'month')
      .isBetween(planStartDate.startOf('month'), planEndDate.endOf('month'));
    const isPreviousMonthEnabled = dayjs(currentMonth)
      .subtract(1, 'month')
      .isBetween(
        planStartDate.startOf('month').subtract(1, 'second'),
        planEndDate.endOf('month')
      );
    return (
      <Box
        position="relative"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={CalendarHeader}
      >
        <Box
          display="flex"
          mt="25px"
          mb="20px"
          gap="8px"
          alignItems="center"
          marginLeft="20px"
        >
          {isPreviousMonthEnabled && (
            <Button onClick={handlePrevMonth}>
              <PreviousIcon />
            </Button>
          )}
          <Typography variant="h4" sx={CalenderHerderFontSize}>
            {currentMonth.format('MMMM YYYY')}
          </Typography>
          {isNextMonthEnabled && (
            <Button onClick={handleNextMonth}>
              <NextIcon />
            </Button>
          )}
        </Box>
        <Box>
          <ExportButtons
            plan={plan}
            planNotes={planNotes}
            isShared={isShared}
          />
        </Box>
      </Box>
    );
  };

  const renderCalendarModal = () => {
    return (
      !isShared &&
      selectedDate &&
      anchorPosition && (
        <CalendarNoteModal
          fetchPlanNotes={fetchPlanNotes}
          selectedDate={selectedDate}
          note={getMatchingNote(selectedDate)}
          plan={plan}
          anchorPosition={anchorPosition}
          onClose={() => setSelectedDate(null)}
        />
      )
    );
  };

  const renderWeekdayTypography = (content: string) => (
    <Typography variant="h6" style={CalendarDayTypography()}>
      {content}
    </Typography>
  );

  const renderWeekDays = () => {
    return (
      <Box display="flex">
        <Box
          display="flex"
          alignItems="center"
          width="98px"
          justifyContent="center"
        >
          {renderWeekdayTypography('Week')}
        </Box>
        <Grid container spacing={0}>
          {DAYS_OF_WEEK.map((day) => (
            <Grid
              item
              xs={12 / 7}
              key={`day-header-${day}`}
              sx={CalendarDayStyle}
            >
              {renderWeekdayTypography(day)}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderWeekNumbers = () => {
    if (!currentMonthDays?.length) {
      return null;
    }
    return (
      <Box>
        {getWeekDisplayCounter({
          plan,
          currentMonth,
          currentMonthDays,
          planNotes,
          isCalendarView: true,
        }).map(
          (
            {
              weekCounter,
              totalDistance,
              totalTime,
              totalOther,
              userMeasurementType,
            },
            i
          ) => {
            return (
              <Box key={`week-${i}`} sx={weekCountStyle}>
                {weekCounter && <Box>Week {weekCounter}</Box>}
                {(totalDistance || totalTime || totalOther) && (
                  <Box sx={weekTotalStyle}>
                    {totalDistance && (
                      <Box>
                        {' '}
                        Distance: {totalDistance.toFixed(2)}{' '}
                        {userMeasurementType}
                      </Box>
                    )}
                    {totalTime && <Box> Time: {totalTime} </Box>}
                    {totalOther && <Box> Other: {totalOther} </Box>}
                  </Box>
                )}
              </Box>
            );
          }
        )}
      </Box>
    );
  };

  return (
    <CalendarContainer>
      <Box sx={CalendarBoxContainer}>
        {renderCalendarHeader()}
        {renderWeekDays()}
        <Box display="flex">
          {renderWeekNumbers()}
          <Grid container spacing={0}>
            {renderCalendarDays()}
          </Grid>
        </Box>
      </Box>
      {renderCalendarModal()}
    </CalendarContainer>
  );
};

export default PlanCalendar;
