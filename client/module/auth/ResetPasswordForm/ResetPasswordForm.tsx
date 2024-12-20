import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppForm, FieldGroup } from '../../shared/form';
import FormCard from '../../shared/FormCard/FormCard';
import { resetPasswordFormFields } from '@mern/ui-shared';
import {
  resetPasswordButton,
  resetPasswordSubmitButton,
} from './ResetPasswordForm.style';
import { useRouter } from 'next/router';
import { getTokenVerifyAPI, resetPassword } from '../../services/auth-services';

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const { resetPasswordToken } = router.query;
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const { reset } = form;

  useEffect(() => {
    const getTokenAPI = async () => {
      try {
        setLoading(true);
        await getTokenVerifyAPI(resetPasswordToken as string); // Call API to verify token
        setLoading(false);
      } catch {
        router.push('/'); // Redirect to home if token verification fails
        // Do nothing
      }
    };

    if (resetPasswordToken) {
      getTokenAPI();
    }
  }, [resetPasswordToken, router]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await resetPassword({ password: data.newPassword, resetPasswordToken });
      router.push('/signin');
    } catch {
      // do nothing
    } finally {
      reset({ newPassword: '', confirmPassword: '' });
      setLoading(false);
    }
  };

  const renderResetPasswordSubmitButton = () => (
    <>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={resetPasswordButton}
      >
        Update
      </Button>
    </>
  );

  return (
    <FormCard title="Reset Password">
      <AppForm form={form} onSubmit={onSubmit}>
        <FieldGroup
          formFields={resetPasswordFormFields}
          displayLabel
          fieldSize={'medium'}
        />
        <Box sx={resetPasswordSubmitButton}>
          {renderResetPasswordSubmitButton()}
        </Box>
      </AppForm>
    </FormCard>
  );
};

export default ResetPasswordForm;
