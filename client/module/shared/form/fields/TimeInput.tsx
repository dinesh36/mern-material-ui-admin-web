import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '@mui/material/styles';
import useValidation from '../useValidation';

interface TimeInputProps {
  label: string;
  value: string | null;
  onChange: (time: string | null) => void;
  error?: Record<string, string>;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  const [inputLabelStyle, setInputLabelStyle] = useState<React.CSSProperties>(
    {}
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const theme = useTheme();

  const validationRules = [
    {
      validate: (val: string | null) => val !== null,
      message: 'Time is required.',
    },
    {
      validate: (val: string | null) => {
        if (val === null) return true;
        const selectedTime = dayjs(val, 'HH:mm:ss');
        const currentTime = dayjs();
        return selectedTime.isAfter(currentTime);
      },
      message: 'Selected time cannot be in the past.',
    },
  ];

  const { isValid } = useValidation(value, validationRules);

  useEffect(() => {
    if (value) {
      setInputLabelStyle({ display: 'none' });
    } else {
      setInputLabelStyle({});
    }
  }, [value]);

  const handleTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format('HH:mm:ss'));
      setInputLabelStyle({ display: 'none' });
    } else {
      onChange(null);
      setInputLabelStyle({});
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value ? dayjs(value, 'HH:mm:ss') : null}
        onChange={handleTimeChange}
        views={['hours', 'minutes', 'seconds']}
        ampm={false}
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        slotProps={{
          textField: {
            fullWidth: true,
            InputLabelProps: {
              shrink: false,
              style: {
                ...inputLabelStyle,
                color: theme.palette.textColor.textGray,
                display: isFocused || value ? 'none' : 'block',
              },
            },
            error: Boolean(error) || !isValid,
            helperText: error?.message,
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
          },
        }}
      />
    </LocalizationProvider>
  );
};
