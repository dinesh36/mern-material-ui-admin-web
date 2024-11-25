import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { validateConfirmEmailToken } from '../services/auth-services';
import { setUserEmailConfirmed } from '../redux/slices/auth-slice';
import { setGlobalLoaderState } from '../redux/slices/layout-slice';

const ConfirmEmail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isValidatingToken, setIsValidatingToken] = useState<boolean>(true);
  const { emailConfirmationToken } = router.query;
  const userEmail = useSelector<RootState>(
    (state: RootState) => state.auth.user?.email
  ) as string;
  const isUserLoggedIn = useSelector<RootState>(
    (state: RootState) => state.auth.isUserLoggedIn
  ) as boolean;

  const redirectToHome = () => {
    const redirectPath = isUserLoggedIn ? '/' : '/signin';
    router.push(redirectPath);
  };

  const validateToken = useCallback(async () => {
    if (!emailConfirmationToken) {
      return;
    }
    try {
      const { status } = await validateConfirmEmailToken(
        emailConfirmationToken as string
      );
      if (status === 'INVALID_TOKEN') {
        (window as any).__errorMessage = 'Confirm email token is not valid';
        window.dispatchEvent(new Event('errorMessage'));
        redirectToHome();
      } else if (status === 'ALREADY_CONFIRMED') {
        (window as any).__errorMessage = isUserLoggedIn
          ? 'Your email is already confirmed'
          : 'Your email is already confirmed, please login to continue.';
        window.dispatchEvent(new Event('errorMessage'));
        redirectToHome();
      } else if (status === 'CONFIRMED') {
        if (!isUserLoggedIn) {
          (window as any).__successMessage =
            'Your email is confirmed, please login to continue.';
          window.dispatchEvent(new Event('successMessage'));
        }
        dispatch(setUserEmailConfirmed());
        setIsValidatingToken(false);
      }
    } catch {
      redirectToHome();
    }
    // eslint-disable-next-line
  }, [emailConfirmationToken, router]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  useEffect(() => {
    dispatch(setGlobalLoaderState(isValidatingToken));
  }, [dispatch, isValidatingToken]);

  return (
    !isValidatingToken && (
      <Box sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="70vh"
          textAlign="center"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <VerifiedIcon sx={{ color: 'green', mr: '8px' }} />
            <Box sx={{ fontSize: '25px' }}>
              Your email address has been confirmed
            </Box>
          </Box>
          <Typography variant="body1" gutterBottom>
            {userEmail}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/')}
            sx={{ mt: 2 }}
          >
            PROCEED
          </Button>
        </Box>
      </Box>
    )
  );
};

export default ConfirmEmail;
