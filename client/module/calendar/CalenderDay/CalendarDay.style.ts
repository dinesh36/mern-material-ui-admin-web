import { styled } from '@mui/system';
import { Box, Paper, Typography } from '@mui/material';
import appColors from '../../shared/appColor';

const hexToRgba = (hex: string, alpha: number) => {
  let r = 0,
    g = 0,
    b = 0;
  hex = hex.replace('#', '');

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex[0] + hex[1], 16);
    g = parseInt(hex[2] + hex[3], 16);
    b = parseInt(hex[4] + hex[5], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface CellProps {
  isDisabled?: boolean;
  bgColor?: string;
  textColor?: string;
  isToday?: boolean;
  isSelectedDate?: boolean;
}

export const NoteTypography = styled(Typography)<{ color: string }>(
  ({ color }) => ({
    marginTop: '6px',
    marginLeft: '13px',
    marginRight: '12px',
    color: color,
    fontWeight: 500,
    fontSize: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textAlign: 'left',
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
  })
);

export const DayCell = styled(Paper)<CellProps>(
  ({ theme, isDisabled, textColor, bgColor, isSelectedDate }) => ({
    height: '140px',
    display: 'flex',
    marginTop: 0,
    padding: 0,
    border: `1px solid ${
      isSelectedDate ? 'black' : theme.palette.border.radioButtonBorder
    }`,
    borderRadius: 0,
    color: isDisabled ? theme.palette.gray.main : textColor || 'black',
    backgroundColor: isDisabled
      ? 'transparent'
      : bgColor && bgColor !== appColors.transparent
        ? hexToRgba(bgColor, 0.1)
        : appColors.white,
    boxShadow: 'none',
    '&:hover': {
      border: !isDisabled ? '1px solid black' : '1px solid #EFEFEF',
      cursor: !isDisabled ? 'pointer' : 'default',
    },
  })
);

export const TodayDateBox = styled(Box)(({ theme }) => ({
  width: '46px',
  height: '42px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '4px',
  marginTop: '6px',
  marginLeft: '3px',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
export const dateAllNumber = {
  fontSize: '20px',
  fontWeight: '500',
};

export const selectedDateNumber = {
  fontSize: '20px',
  marginTop: '11px',
  fontWeight: '500',
};

export const calendarDayFont = {
  fontSize: '12px',
};
