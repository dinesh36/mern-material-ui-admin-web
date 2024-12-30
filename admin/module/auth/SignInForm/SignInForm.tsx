import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  signInService,
  storeUserAndAccessToken,
} from '../../services/auth-services';
import {
  signInFormBoxButton,
  signInForgotPasswordButton,
} from './SignInForm.style';
import { AppForm, FieldGroup } from '../../shared/form';
import { signInFormFields } from '@mern/ui-shared';
import { SignInBody } from '../../../models/auth.type';
import FormCard from '../../shared/FormCard/FormCard';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../redux/store';
import { setTokens, setUser } from '../../redux/slices/auth-slice';

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: { email: '', password: '' },
  });
  const router = useRouter();

  const onSubmit = async (data: SignInBody) => {
    setLoading(true);
    try {
      const { accessToken, refreshToken, user } = await signInService(data);
      dispatch(setUser({ user }));
      dispatch(setTokens({ accessToken, refreshToken }));
      storeUserAndAccessToken({ accessToken, refreshToken, user });
      router.push('/');
    } catch {
      // do nothing
    } finally {
      setLoading(false);
    }
  };

  const renderSignInFormSubmitButton = () => (
    <>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={signInForgotPasswordButton}
      >
        Sign In
      </Button>
    </>
  );

  return (
    <FormCard title="Login">
      <AppForm form={form} onSubmit={onSubmit}>
        <FieldGroup
          formFields={signInFormFields}
          displayLabel
          fieldSize={'medium'}
        />
        <Box sx={signInFormBoxButton}>{renderSignInFormSubmitButton()}</Box>
      </AppForm>
    </FormCard>
  );
};

export default SignInForm;
