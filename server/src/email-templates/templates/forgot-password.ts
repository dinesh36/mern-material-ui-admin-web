import { getAuthContainerTemplate } from './auth-container';
import { FEUrl } from '../../lib/config';

export const generateForgotPasswordTemplate = ({
  resetPasswordToken,
  userName,
}: any) => {
  return getAuthContainerTemplate({
    bodyContent: `
       <table style="background-color: #f7f7f7;border-color: #D4E2FE; width: 100%; padding: 20px;" cellspacing="0">
          <tr>
              <td style="color: #000000; font-size: 16px; padding-bottom: 10px;">
                  Hello, <strong>${userName}</strong>
              </td>
          </tr>
          <tr>
              <td style="color: #000000; font-size: 16px; padding: 10px 0px;">
                  A password reset for your account was requested. Please click the button below to change your password. Note that this link is valid for 24 hours. After the time limit has expired, you will have to resubmit the request for a password reset.
              </td>
          </tr>
          <tr>
              <td style="padding: 20px" align="center">
                  <table>
                      <tr>
                          <td>
                              <a
                                      style="display: block;background-color: #195CE5;color: #ffffff;padding: 15px 30px;text-decoration: none;border-radius: 6px;font-size: 16px;"
                                      href="${FEUrl}/reset-password/${resetPasswordToken}">
                                  Reset Password
                              </a>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td style="color: #000000; font-size: 16px; padding: 10px 0px;">
                  If you don’t like clicking buttons, you can copy and paste this link into your browser:
              </td>
          </tr>
          <tr>
              <td style="color: #000000; font-size: 16px; padding: 10px 0px;">
                  <a href="${FEUrl}/reset-password/${resetPasswordToken}">${FEUrl}/reset-password/${resetPasswordToken}</a>
              </td>
          </tr>
      </table>
    `,
  });
};
