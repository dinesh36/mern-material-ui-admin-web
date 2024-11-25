import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { formCheckLabelStyle, formContolStyle } from './CheckboxGroup.style';

interface SelectTypeCheckboxProps {
  value: string[];
  onChange: (event: { target: { value: any[] } }) => void;
  error?: any;
  options?: {
    label: string;
    value: string;
    type: string;
  }[];
}

export const CheckboxGroup: React.FC<SelectTypeCheckboxProps> = ({
  value = [],
  onChange,
  options = [],
  error = null,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const updatedValues = event.target.checked
      ? [...value, newValue]
      : value.filter((v) => v !== newValue);
    onChange({ target: { value: updatedValues } });
  };

  return (
    <Box>
      <FormControl component="fieldset" sx={formContolStyle}>
        {options.map((option: { label: string; value: string }) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                onChange={handleChange}
                value={option.value}
              />
            }
            label={option.label}
            // @ts-ignore
            sx={(theme) => formCheckLabelStyle(theme, value, option.value)}
          />
        ))}
      </FormControl>
      {error && (
        <FormHelperText error>
          {typeof error === 'string' ? error : 'This field is required'}
        </FormHelperText>
      )}
    </Box>
  );
};
