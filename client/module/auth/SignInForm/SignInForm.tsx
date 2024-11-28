import React, { useState } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  signInService,
  storeUserAndAccessToken,
} from '../../services/auth-services';
import {
  signInFormBoxButton,
  signInForgotPassword,
  signInForgotPasswordButton,
} from './SignInForm.style';
import { AppForm, FieldGroup } from '../../shared/form';
import { signInFormFields } from './signInFormFields';
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
      <Typography variant="body2" fontWeight={500}>
        Don’t have an Account?
        <Typography variant="body2" component="span" fontWeight="bold">
          <Link href="/signup" color="inherit" style={{ marginLeft: '5px' }}>
            Sign Up
          </Link>
        </Typography>
      </Typography>
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
        <Box mt={'20px'}>
          <Link
            href="/forgot-password"
            color="inherit"
            sx={signInForgotPassword}
          >
            Forgot Password?
          </Link>
        </Box>
        <Box sx={signInFormBoxButton}>{renderSignInFormSubmitButton()}</Box>
      </AppForm>
    </FormCard>
  );
};

export default SignInForm;
