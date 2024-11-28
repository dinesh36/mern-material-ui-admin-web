import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/global.css';
import React from 'react';
import Header from '../module/layout/Header/Header';
import { Box } from '@mui/material';
import { Toaster } from '../module/shared/Toaster';
import Head from 'next/head';
import AuthGuard from '../module/auth-guard/AuthGuard';
import { theme } from '../module/layout/CommonStyles/AppTheme';
import { Provider } from 'react-redux';
import store from '../module/redux/store';
import GlobalLoader from '../module/shared/GlobalLoader';

// eslint-disable-next-line
function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalLoader />
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.app.lightGray,
              minHeight: '100vh',
            }}
          >
            <Header />
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
            <Toaster />
          </Box>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
