import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkLogin } from '../services/auth-services';
import { isDualAccessPage, isPublicPage } from '../../utils/public-page';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../models/auth.type';
import { RootState } from '../redux/store';
import { setGlobalLoaderState } from '../redux/slices/layout-slice';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const storeUser = useSelector<RootState>(
    (state: RootState) => state.auth.user
  ) as User;

  useEffect(() => {
    const handleLoggedInPagesRedirects = async (user: User) => {
      const { isUserEmailConfirmed } = user;
      if (
        isUserEmailConfirmed &&
        router.asPath === '/pending-email-verification'
      ) {
        await router.push('/');
      } else if (
        !isUserEmailConfirmed &&
        router.asPath !== '/pending-email-verification' &&
        !router.asPath.startsWith('/confirm-email')
      ) {
        await router.push('/pending-email-verification');
      } else if (isPublicPage(router.asPath)) {
        await router.push('/');
      }
    };

    const handlePageRedirects = async () => {
      const user = storeUser || (await checkLogin({ dispatch }));
      const isUserLoggedIn = !!user;
      if (
        !isPublicPage(router.asPath) &&
        !isDualAccessPage(router.asPath) &&
        !isUserLoggedIn
      ) {
        await router.push('/signin');
      } else if (isUserLoggedIn) {
        await handleLoggedInPagesRedirects(user);
      }
      setIsCheckingLogin(false);
    };

    handlePageRedirects();
  }, [dispatch, router, storeUser]);

  useEffect(() => {
    dispatch(setGlobalLoaderState(isCheckingLogin));
  }, [dispatch, isCheckingLogin]);

  return !isCheckingLogin && children;
};

export default AuthGuard;
