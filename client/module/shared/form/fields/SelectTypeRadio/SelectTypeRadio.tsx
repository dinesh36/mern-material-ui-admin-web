import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';
import { formControlLabelStyle } from './SelectTypeRadio.style';

interface SelectTypeRadioProps {
  field: ControllerRenderProps<any, any>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  options?: {
    label: string;
    value: string;
    type: string;
  }[];
}

export const SelectTypeRadio: React.FC<SelectTypeRadioProps> = ({
  field,
  value,
  onChange,
  options = [],
}) => {
  return (
    <Box>
      <FormControl component="fieldset">
        <RadioGroup
          row
          {...field}
          value={value}
          onChange={onChange}
          sx={{ gap: '20px' }}
        >
          {options.map((option: { label: string; value: string }) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              // @ts-ignore
              sx={(theme) => formControlLabelStyle(theme, value, option.value)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
