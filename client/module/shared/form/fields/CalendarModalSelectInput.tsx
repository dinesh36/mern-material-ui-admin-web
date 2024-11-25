import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  name: string;
  label: string;
  value: string | number | '';
  onChange: (value: string | number) => void;
  error?: Record<string, string>;
  helperText?: string;
  options: Option[];
}

export const CalendarModalSelectInput: React.FC<CustomSelectProps> = ({
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
        onChange={(e: SelectChangeEvent<string | number>) =>
          onChange(e.target.value)
        }
        renderValue={(selected) => {
          if (!selected) {
            return (
              <span style={{ color: theme.palette.text.secondary }}>
                {label}
              </span>
            );
          }
          const selectedOption = options.find(
            (option) => option.value === selected
          );
          return (
            <span style={{ color: theme.palette.text.primary }}>
              {selectedOption ? selectedOption.label : selected}
            </span>
          );
        }}
      >
        <MenuItem disabled value="">
          <span style={{ color: theme.palette.text.secondary }}>{label}</span>
        </MenuItem>
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
