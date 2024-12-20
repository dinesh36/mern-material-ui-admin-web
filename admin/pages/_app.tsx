import * as React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { extendTheme } from "@mui/material/styles";
import { SidebarFooterAccountPopover } from "@/src/components/SidebarFooterAccountPopover";
import { AuthenticationProvider } from "@/src/components/AuthenticationProvider";
import { navigation } from "@/src/navigation";
import "@/styles/globals.css";
// import { AppIcon } from "@/Module/icons/AppIcon";

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
  const isHomePage = router.pathname === "/signin";

  return (
    <AuthenticationProvider>
      <AppProvider
        navigation={navigation}
        branding={{
          // logo: <AppIcon />,
          title: "MERN App",
          homeUrl: "/dashboard",
        }}
        router={{
          pathname: router.pathname,
          searchParams: new URLSearchParams(),
          navigate: (path: string | URL) => router.push(path.toString()),
        }}
        theme={demoTheme}
      >
        {isHomePage ? (
          <Component {...pageProps} />
        ) : (
          <DashboardLayout
            slots={{ sidebarFooter: SidebarFooterAccountPopover }}
          >
            <Component {...pageProps} />
          </DashboardLayout>
        )}
      </AppProvider>
    </AuthenticationProvider>
  );
}
