import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppForm, FieldGroup } from '../../shared/form';
import FormCard from '../../shared/FormCard/FormCard';
import {
  forgotPasswordButton,
  forgotPasswordMessage,
  forgotPasswordSubmitButton,
} from './ForgotPasswordForm.style';
import { forgotPasswordFormFields } from './forgotPasswordFormFields';
import { sendResetPasswordEmail } from '../../services/auth-services';
import { useRouter } from 'next/router';

const ForgotPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isResetPasswordLinkSent, setIsResetPasswordLinkSent] = useState(false);
  const form = useForm({
    defaultValues: { email: '' },
  });
  const router = useRouter();
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await sendResetPasswordEmail(data);
      setIsResetPasswordLinkSent(true);
    } catch {
      // do nothing
    } finally {
      setLoading(false);
    }
  };

  const backToLogin = () => {
    router.push('/signin');
  };

  const renderForgotEmailNotification = () => {
    return (
      <Box maxWidth={'500px'} textAlign="center" margin="0px auto">
        <Typography variant="body2">
          If you have an account with us, an email with instructions to reset
          your password will be sent to the email address you provided.
        </Typography>
        <Box mt="10px">
          <Button onClick={backToLogin}> BACK TO LOGIN </Button>
        </Box>
      </Box>
    );
  };

  const renderForgotPasswordMessage = () => (
    <>
      <Typography variant="body2" sx={forgotPasswordMessage}>
        Please enter your email address, You will receive a password reset link
        to create a new password via email.
      </Typography>
    </>
  );

  const renderForgotPasswordSubmitButton = () => (
    <>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={forgotPasswordButton}
      >
        Submit
      </Button>
    </>
  );

  const renderForm = () => {
    return (
      <AppForm form={form} onSubmit={onSubmit}>
        <Box>{renderForgotPasswordMessage()}</Box>
        <FieldGroup
          formFields={forgotPasswordFormFields}
          displayLabel
          fieldSize={'medium'}
        />
        <Box sx={forgotPasswordSubmitButton}>
          {renderForgotPasswordSubmitButton()}
        </Box>
      </AppForm>
    );
  };

  return (
    <FormCard title="Forgot Password">
      {!isResetPasswordLinkSent
        ? renderForm()
        : renderForgotEmailNotification()}
    </FormCard>
  );
};

export default ForgotPasswordForm;
