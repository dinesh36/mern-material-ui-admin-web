import type { AppProps } from "next/app";
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { extendTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { navigation } from "@/module/src/component/navigation";
import { theme } from "@/module/layout/CommonStyles/AppTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { Toaster } from "@/module/shared/Toaster";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/module/redux/store";
import GlobalLoader from "@/module/shared/GlobalLoader";
import { AppIcon } from "@mern/ui-shared";
import Signin from "../pages/signin";
import AuthenticatedAppContent from "@/module/Dashboard/AuthenticatedAppContent";

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const routerAdapter = React.useMemo(
    () => ({
      pathname: router.pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => router.push(path.toString()),
    }),
    [router],
  );

  const isSignInPage = router.pathname === "/signin";

  return (
    <Provider store={store}>
      {!isSignInPage ? (
        <ThemeProvider theme={theme}>
          <AppProvider
            navigation={navigation}
            branding={{
              logo: <AppIcon />,
              title: "MERN App",
            }}
            router={routerAdapter}
            theme={demoTheme}
          >
            <GlobalLoader />
            <CssBaseline />
            <Box sx={{ minHeight: "100vh" }}>
              <Head>
                <link
                  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
                  rel="stylesheet"
                />
              </Head>
              <AuthenticatedAppContent
                routerAdapter={routerAdapter}
                Component={Component}
                pageProps={pageProps}
              />
              <Toaster />
            </Box>
          </AppProvider>
        </ThemeProvider>
      ) : (
        <Signin />
      )}
    </Provider>
  );
}
