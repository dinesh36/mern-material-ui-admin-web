import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const HIDE_TIMEOUT = 4000;

export const Toaster = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [alertMessage, setAlertMessage] = useState<string>('');

  useEffect(() => {
    window.addEventListener('successMessage', () => {
      setAlertType('success');
      setAlertMessage((window as any).__successMessage);
      setOpen(true);
      setTimeout(() => setOpen(false), HIDE_TIMEOUT);
    });
    window.addEventListener('errorMessage', () => {
      setAlertType('error');
      setAlertMessage((window as any).__errorMessage);
      setOpen(true);
      setTimeout(() => setOpen(false), HIDE_TIMEOUT);
    });
  }, []);

  return (
    <Snackbar open={open}>
      <Alert severity={alertType} variant="filled">
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
