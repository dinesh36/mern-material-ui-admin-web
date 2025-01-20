import express from 'express';

export const publicApis = [
  { method: 'POST', path: '/api/auth/login' },
  { method: 'POST', path: '/api/auth/admin-login' },
  { method: 'POST', path: '/api/auth/signup' },
  { method: 'POST', path: '/api/auth/send-reset-password-link' },
  { method: 'GET', path: '/api/auth/password-token-verify' },
  { method: 'POST', path: '/api/auth/reset-password' },
  { method: 'POST', path: '/api/auth/refresh' },
  { method: 'GET', path: '/api/auth/validate-confirm-email-token' },
  { method: 'GET', path: '/mern-material-ui-admin-web/uploads/*' },
];

export const isPublicAPI = (req: express.Request) => {
  return !!publicApis.find(({ path, method }) => {
    const pathRegExpString = path
      .split('/')
      .map((splitPath) => {
        if (splitPath.startsWith(':')) {
          return '([a-zA-Z0-9_-]+)';
        }
        return splitPath;
      })
      .join('/');
    return (
      req.path.match(new RegExp(pathRegExpString)) && method === req.method
    );
  });
};
