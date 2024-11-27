export const publicPages = [
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

export const dualAccessPages = ['/confirm-email'];

export const isPublicPage = (path: string) => {
  return !!publicPages.find((publicPath) => path.startsWith(publicPath));
};

export const isDualAccessPage = (path: string) => {
  return !!dualAccessPages.find((publicPath) => path.startsWith(publicPath));
};
