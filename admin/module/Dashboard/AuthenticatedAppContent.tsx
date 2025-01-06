import React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import SidebarFooterAccountPopover from "@/module/Dashboard/SidebarFooterAccountPopover";
import AuthGuard from "@/module/auth-guard/AuthGuard";

interface AppRouterAdapter {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (path: string | URL) => Promise<boolean>;
}

interface AuthenticatedAppContentWrapperProps {
  routerAdapter: AppRouterAdapter;
  Component: React.ComponentType<any>;
  pageProps: any;
}

const AuthenticatedAppContentWrapper: React.FC<
  AuthenticatedAppContentWrapperProps
> = ({ Component, pageProps }) => {
  return (
    <>
      <AuthGuard>
        <DashboardLayout
          slots={{
            sidebarFooter: SidebarFooterAccountPopover,
          }}
        >
          <Component {...pageProps} />
        </DashboardLayout>
      </AuthGuard>
    </>
  );
};

export default AuthenticatedAppContentWrapper;
