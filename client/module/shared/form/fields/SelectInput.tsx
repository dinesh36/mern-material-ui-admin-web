import React from 'react';
import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomSelectProps {
  name: string;
  label: string; // Still using the label as a placeholder
  value: string | number | '';
  onChange: (value: number) => void;
  error?: Record<string, string>;
  helperText?: string;
  options: number[];
}

export const SelectInput: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  error,
  options,
}) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth error={Boolean(error)} variant="outlined">
      <Select
        displayEmpty
        size="small"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        renderValue={(selected) => {
          if (!selected) {
            return (
              <span style={{ color: theme.palette.app.grayText }}>{label}</span>
            );
          }
          return (
            <span style={{ color: theme.palette.textColor.black }}>
              {`${selected} ${selected === 1 ? 'Week' : 'Weeks'}`}
            </span>
          );
        }}
      >
        <MenuItem disabled value="">
          <span style={{ color: theme.palette.app.grayText }}>{label}</span>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {`${option} ${option === 1 ? 'Week' : 'Weeks'}`}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
