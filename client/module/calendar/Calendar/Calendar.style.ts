import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const CalendarContainer = styled(Box)(() => ({
  textAlign: 'center',
  marginBottom: '50px',
}));

export const CalendarHeader = (theme: {
  palette: { app: { white: any }; border: { radioButtonBorder: any } };
}) => ({
  backgroundColor: theme.palette.app.white,
  borderBottom: `1px solid ${theme.palette.border.radioButtonBorder}`,
});

export const CalendarDayStyle = {
  padding: '20px 0 20px 0',
};

export const CalendarDayTypography = () => {
  const theme = useTheme();
  return {
    color: theme.palette.textColor.black,
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '18px',
  };
};

export const CalendarBoxContainer = () => {
  const theme = useTheme();
  return {
    border: `1px solid ${theme.palette.border.radioButtonBorder}`,
    marginTop: '30px',
  };
};

export const CalenderHerderFontSize = {
  fontSize: '26px',
  fontWeight: 700,
};

export const weekCountStyle = (theme: {
  palette: { border: { radioButtonBorder: any } };
}) => ({
  height: '140px',
  border: `1px solid ${theme.palette.border.radioButtonBorder}`,
  textAlign: 'center',
  width: '96px',
  paddingTop: '20px',
});

export const weekTotalStyle = () => ({
  fontSize: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  paddingTop: '10px',
});
