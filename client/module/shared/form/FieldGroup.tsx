import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const Field = ({ formField, displayLabel, fieldSize }: any) => {
  const form = useFormContext();
  const {
    control,
    formState: { errors },
  } = form;
  const {
    xs = 12,
    name,
    rules,
    label,
    maxLength,
    renderer: Renderer,
    disabled,
    fieldProps = {},
  } = formField;

  return (
    <Grid item xs={xs}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              {displayLabel && (
                <Typography
                  mb={'12px'}
                  fontWeight={600}
                  fontSize={fieldSize === 'small' ? '16px' : '18px'}
                >
                  {label}
                </Typography>
              )}
              <Renderer
                {...field}
                disabled={disabled}
                placeholder={label}
                label={label}
                maxLength={maxLength}
                error={errors[name]}
                fieldSize={fieldSize}
                {...fieldProps}
              />
            </>
          );
        }}
      />
    </Grid>
  );
};

type FieldGroupProps = {
  formFields: Array<any>;
  displayLabel?: boolean;
  fieldSize?: 'medium' | 'small';
};

export const FieldGroup = ({
  formFields,
  displayLabel = false,
  fieldSize = 'small',
}: FieldGroupProps) => {
  return (
    <Grid container spacing={fieldSize === 'small' ? '16px' : '30px'}>
      {formFields.map((formField: any) => (
        <Field
          formField={formField}
          displayLabel={displayLabel}
          fieldSize={fieldSize}
        />
      ))}
    </Grid>
  );
};
