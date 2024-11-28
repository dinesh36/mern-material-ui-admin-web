import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

export const TextField = ({
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  disabled,
  fieldSize = 'small',
}: any) => {
  return (
    <MuiTextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={Boolean(error)}
      helperText={error?.message}
      inputProps={{ maxLength }}
      fullWidth
      size={fieldSize}
    />
  );
};
