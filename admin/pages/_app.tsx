import type { AppProps } from "next/app";
import * as React from "react";
import { AppProvider, Session } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { extendTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { navigation } from "@/src/navigation";
import "@/styles/globals.css";
import { SidebarFooterAccountPopover } from "@/src/components/SidebarFooterAccountPopover";
import {
  AuthenticationProvider,
  useAuthentication,
} from "@/src/components/AuthenticationProvider";

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

  return (
    <AuthenticationProvider>
      <AuthenticatedAppContent
        routerAdapter={routerAdapter}
        Component={Component}
        pageProps={pageProps}
      />
    </AuthenticationProvider>
  );
}

interface AuthenticatedAppContentProps {
  routerAdapter: {
    pathname: string;
    searchParams: URLSearchParams;
    navigate: (path: string | URL) => void;
  };
  Component: React.ComponentType<any>;
  pageProps: any;
}

const AuthenticatedAppContent: React.FC<AuthenticatedAppContentProps> = ({
  routerAdapter,
  Component,
  pageProps,
}) => {
  const { session, signIn, signOut } = useAuthentication();

  return (
    <AppProvider
      navigation={navigation}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "MERN Admin App",
      }}
      router={routerAdapter}
      theme={demoTheme}
      session={session as Session | null}
      authentication={{
        signIn,
        signOut,
      }}
    >
      <DashboardLayout slots={{ sidebarFooter: SidebarFooterAccountPopover }}>
        <Component {...pageProps} />
      </DashboardLayout>
    </AppProvider>
  );
}
