import { apiService } from './api-service';
import {
  ChangePasswordBody,
  EditUserBody,
  SignInBody,
} from '../../models/auth.type';
import { setTokens, setUser } from '../redux/slices/auth-slice';
import { Dispatch } from 'redux';

export const signInService = async (signInBody: SignInBody) => {
  try {
    return await apiService({
      url: '/auth/admin-login',
      method: 'POST',
      data: signInBody,
      ignoreServerMessage: true,
      errorMessage: 'User is not authorized to login',
    });
    window.dispatchEvent(new Event('login'));
  } catch (e) {
    throw e;
  }
};

export const signUpService = async (signUpBody: FormData) => {
  try {
    return await apiService({
      url: '/auth/signup',
      method: 'POST',
      data: signUpBody,
      successMessage: 'User created successfully',
      errorMessage: 'Failed to create an account',
    });
  } catch (e) {
    throw e;
  }
};

export const changePassword = async (
  ChangePasswordBody: ChangePasswordBody
) => {
  try {
    return await apiService({
      url: '/auth/change-password',
      method: 'POST',
      data: ChangePasswordBody,
      errorMessage: 'Failed to change password',
      successMessage: 'Password updated successfully',
    });
  } catch (e) {
    throw e;
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  try {
    return await apiService({
      url: '/auth/send-reset-password-link',
      method: 'POST',
      data: email,
      errorMessage: 'Error in sending the reset password details',
    });
  } catch (e) {
    throw e;
  }
};

export const getTokenVerifyAPI = async (resetPasswordToken: string) => {
  try {
    return await apiService({
      url: `/auth/password-token-verify/${resetPasswordToken}`,
      errorMessage:
        'Reset password token not match or reset password token has expired',
    });
  } catch (e) {
    throw e;
  }
};

export const resetPassword = async ({ password, resetPasswordToken }: any) => {
  try {
    return await apiService({
      url: '/auth/reset-password',
      method: 'POST',
      data: { password, resetPasswordToken },
      errorMessage: 'Failed to update password',
      successMessage:
        'Password is reset successfully, please try to login here.',
    });
  } catch (e) {
    throw e;
  }
};

export const editUser = async (editUserBody: FormData) => {
  try {
    return await apiService({
      url: '/auth/user',
      method: 'PUT',
      data: editUserBody,
      successMessage: 'User updated successfully',
      errorMessage: 'Failed to update an account',
    });
  } catch (e) {
    throw e;
  }
};

export const fetchUser = async () => {
  try {
    return await apiService({
      url: '/auth/user',
      errorMessage: 'Error in fetching the user details',
    });
  } catch (e) {
    throw e;
  }
};

export const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event('logout'));
};

export const getLocalUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') as string);
  } catch {
    return null;
  }
};

export const updateUserDetails = (getUpdateData: EditUserBody) => {
  localStorage.setItem('user', JSON.stringify(getUpdateData));
};

export const storeUserAndAccessToken = ({
  user,
  accessToken,
  refreshToken,
}: {
  user: any;
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
};

export const checkLogin = async ({ dispatch }: { dispatch: Dispatch }) => {
  try {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (!storedAccessToken) {
      return false;
    }
    const user = await apiService({
      url: '/auth/check-login',
      ignoreServerMessage: true,
    });

    updateUserDetails(user);
    dispatch(setUser({ user }));
    dispatch(
      setTokens({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      })
    );
    return user;
  } catch {
    return false;
  }
};

export const resendVerificationEmail = async () => {
  try {
    return await apiService({
      url: '/auth/resend-verification-email',
      successMessage: 'Verification email is sent successfully',
    });
  } catch {}
};

export const validateConfirmEmailToken = async (
  emailConfirmationToken: string
) => {
  try {
    return await apiService({
      url: `/auth/validate-confirm-email-token/${emailConfirmationToken}`,
      errorMessage: 'Error in validating the token',
      ignoreServerMessage: true,
    });
  } catch {}
};
