import auth from './auth';
import express from 'express';
import { upload } from '../../utils/s3Uploader';

class AuthRoutes {
  init(app: express.Application, reqWrapper: any) {
    app.post('/api/auth/login', reqWrapper(auth.login.bind(auth)));
    app.post(
      '/api/auth/signup',
      upload.single('profileImage'),
      reqWrapper(auth.signup.bind(auth))
    );
    app.post(
      '/api/auth/change-password',
      reqWrapper(auth.changePassword.bind(auth))
    );
    app.post(
      '/api/auth/send-reset-password-link',
      reqWrapper(auth.sendResetPasswordLink.bind(auth))
    );
    app.get(
      '/api/auth/password-token-verify/:resetPasswordToken',
      reqWrapper(auth.validateResetPasswordToken.bind(auth))
    );
    app.post(
      '/api/auth/reset-password',
      reqWrapper(auth.resetPassword.bind(auth))
    );
    app.put(
      '/api/auth/user',
      upload.single('profileImage'),
      reqWrapper(auth.editUserDetails.bind(auth))
    );
    app.get('/api/auth/user', reqWrapper(auth.fetchUserDetails.bind(auth)));
    app.post('/api/auth/refresh', reqWrapper(auth.refresh.bind(auth)));
    app.get('/api/auth/check-login', reqWrapper(auth.checkLogin.bind(auth)));
    app.get(
      '/api/auth/resend-verification-email',
      reqWrapper(auth.resendVerificationEmail.bind(auth))
    );
    app.get(
      '/api/auth/validate-confirm-email-token/:emailConfirmationToken',
      reqWrapper(auth.validateConfirmEmailToken.bind(auth))
    );
  }
}

export default new AuthRoutes();
