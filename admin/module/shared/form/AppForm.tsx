import React from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { submitButton, submitButtonContainer } from './AppForm.style';

export const AppForm = ({
  children,
  form,
  onSubmit,
  sx,
  submitButtonText = false,
  isLoading,
}: any) => {
  const { handleSubmit } = form;
  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={sx}>
        {children}

        {submitButtonText && (
          <Box sx={submitButtonContainer}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={submitButton}
            >
              {submitButtonText}
            </Button>
          </Box>
        )}
      </Box>
    </FormProvider>
  );
};
