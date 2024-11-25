import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const formContolStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
};

export const formCheckLabelStyle = (
  theme: Theme,
  value: any,
  type: any
): SxProps<Theme> => ({
  border: '1.45px solid',
  borderColor: value.includes(type)
    ? theme.palette.primary.main
    : theme.palette.border.radioButtonBorder,
  borderRadius: '5.79px',
  padding: '8px 10px',
  width: '230px',
  height: '58px',
  margin: 0,
});
