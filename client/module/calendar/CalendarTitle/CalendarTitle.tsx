import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { calendarTitleContainer } from './CalendarTitle.style';
import CalendarIcon from '../../icons/CalendarIcon';
import { Plan } from '../../../models/plan.type';
import { getPlanDateString } from '../../../utils/date-utils';
import { useTheme } from '@mui/material/styles';

interface CalendarTitleProps {
  plan: Plan;
}

const CalendarTitle: React.FC<CalendarTitleProps> = ({ plan }) => {
  const theme = useTheme();

  const { title, description, startDate = '8 Apr', weeks = 8 } = plan || {};
  return (
    <Card sx={calendarTitleContainer}>
      <CardContent>
        <Typography variant="h6" style={{ fontSize: '20px' }}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Box display="flex" alignItems="center" sx={{ marginTop: '10px' }}>
          <Box sx={{ marginRight: '12px', width: '20px', height: '20px' }}>
            <CalendarIcon
              width={20}
              height={20}
              fill={theme.palette.fill.gray}
            />
          </Box>
          <Typography variant="body2" style={{ fontWeight: '700' }}>
            {getPlanDateString(startDate)} | {`${weeks} Weeks`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalendarTitle;
