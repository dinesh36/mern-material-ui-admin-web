import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CalendarIcon from '../../../icons/CalendarIcon';
import { useTheme } from '@mui/material/styles';
import useValidation from '../useValidation';

interface DateInputProps {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
  minDate?: string;
  error?: Record<string, string>;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  minDate,
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
      message: 'Date is required.',
    },
    {
      validate: (val: string | null) => {
        if (val === null) return true;
        const selectedDate = dayjs(val).startOf('day');
        const today = dayjs().startOf('day');
        return !selectedDate.isBefore(today);
      },
      message: 'Selected date cannot be earlier than today.',
    },
    {
      validate: (val: string | null) => {
        if (!val) return true;

        const year = dayjs(val).year();
        return year.toString().length === 4;
      },
      message: 'Please enter the year properly.',
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

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(dayjs(newValue).format('YYYY-MM-DD'));
      setInputLabelStyle({ display: 'none' });
    } else {
      onChange(null);
      setInputLabelStyle({});
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={handleDateChange}
        minDate={minDate ? dayjs(minDate) : dayjs()}
        slots={{
          openPickerIcon: (props) => (
            <CalendarIcon width={14} height={14} {...props} />
          ),
        }}
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
