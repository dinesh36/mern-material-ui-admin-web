import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../module/redux/store';
import { User } from '../models/auth.type';
import { resendVerificationEmail } from '../module/services/auth-services';

const PendingEmailVerification = () => {
  const [isResendEmailSending, setIsResendEmailSending] =
    useState<boolean>(false);
  const user = useSelector<RootState>(
    (state: RootState) => state.auth.user
  ) as User;

  const handleResendVerification = async () => {
    try {
      setIsResendEmailSending(true);
      await resendVerificationEmail();
    } catch {
      /* Do nothing*/
    } finally {
      setIsResendEmailSending(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 68px)"
      margin="0px auto"
      maxWidth="600px"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Check your email
      </Typography>
      <Typography variant="body1" gutterBottom>
        We have sent an email to <strong>{user?.email}</strong>, click the link
        in the email to confirm your address and activate your account.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Didn't get the email?
      </Typography>
      <Button
        onClick={handleResendVerification}
        variant="contained"
        color="primary"
        disabled={isResendEmailSending}
        sx={{ mt: 2 }}
      >
        Resend Verification Email
      </Button>
    </Box>
  );
};

export default PendingEmailVerification;
