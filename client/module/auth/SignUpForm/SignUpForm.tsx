import React, { useState } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormCard from '../../shared/FormCard/FormCard';
import { AppForm, FieldGroup } from '../../shared/form';
import {
  signInForgotPasswordButton,
  signInFormBoxButton,
} from '../SignInForm/SignInForm.style';
import { signUpFormFields } from './signupFormField';
import {
  signUpService,
  storeUserAndAccessToken,
} from '../../services/auth-services';
import { useRouter } from 'next/router';

const SignUpForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const form = useForm({
    defaultValues,
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      const { accessToken, refreshToken, user } = await signUpService(formData);
      storeUserAndAccessToken({ accessToken, refreshToken, user });
      router.push('/');
    } catch {
      /** Error handled from the service **/
    } finally {
      setLoading(false);
    }
  };

  const renderSignInFormSubmitButton = () => (
    <>
      <Typography variant="body2" fontWeight={500}>
        Already have an Account?
        <Typography variant="body2" component="span" fontWeight="bold">
          <Link href="/signin" color="inherit" style={{ marginLeft: '5px' }}>
            Sign In
          </Link>
        </Typography>
      </Typography>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={signInForgotPasswordButton}
      >
        Sign Up
      </Button>
    </>
  );

  return (
    <FormCard title="Create an Account">
      <AppForm form={form} onSubmit={onSubmit}>
        <FieldGroup
          formFields={signUpFormFields}
          displayLabel
          fieldSize={'medium'}
        />
        <Box sx={signInFormBoxButton}>{renderSignInFormSubmitButton()}</Box>
      </AppForm>
    </FormCard>
  );
};

export default SignUpForm;
