import { getAuthContainerTemplate } from './auth-container';
import { FEUrl } from '../../lib/config';

export const generateSignupTemplate = ({
  userName,
  userEmail,
  emailConfirmationToken,
}: any) => {
  return getAuthContainerTemplate({
    bodyContent: `
      <table style="background-color: #f7f7f7;border-color: #D4E2FE; width: 100%; padding: 20px;" cellspacing="0">
          <tr>
              <td style="color: #000000; font-size: 22px; padding-bottom: 10px; text-align: center; font-weight: bold;">
                  Verify your email address
              </td>
          </tr>
          <tr>
              <td style="color: #000000; font-size: 16px; padding-bottom: 10px;">
                  Hello, <strong>${userName}</strong>
              </td>
          </tr>
          <tr>
              <td style="color: #000000; font-size: 16px; padding: 10px 0px;">
                  You created an account using the email address <strong>${userEmail}</strong>.
              </td>
          </tr>
          <tr>
              <td style="padding: 20px" align="center">
                  <table>
                      <tr>
                          <td>
                              <a
                                      style="display: block;background-color: #195CE5;color: #ffffff;padding: 15px 30px;text-decoration: none;border-radius: 6px;font-size: 16px;"
                                      href="${FEUrl}/confirm-email/${emailConfirmationToken}">
                                  Confirm Email
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
                  <a href="${FEUrl}/confirm-email/${emailConfirmationToken}">${FEUrl}/confirm-email/${emailConfirmationToken}</a>
              </td>
          </tr>
      </table>
    `,
  });
};
