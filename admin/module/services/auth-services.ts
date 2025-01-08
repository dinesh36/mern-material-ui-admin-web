import { apiService } from './api-service';
import {
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

export const getUserDetails = async () => {
  try {
    return await apiService({
      url: '/auth/admin-get-details',
      method: 'GET',
      ignoreServerMessage: true,
      errorMessage: 'User is not authorized to login',
    });
    window.dispatchEvent(new Event('login'));
  } catch (e) {
    throw e;
  }
};

export const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event('logout'));
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

