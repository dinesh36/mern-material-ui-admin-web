import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const formControlLabelStyle = (
  theme: Theme,
  value: any,
  type: any
): SxProps<Theme> => ({
  border: '1.45px solid',
  borderColor:
    value === type
      ? theme.palette.primary.main
      : theme.palette.border.radioButtonBorder,
  borderRadius: '5.79px',
  padding: '8px 10px',
  width: '230px',
  height: '58px',
  margin: 0,
});
