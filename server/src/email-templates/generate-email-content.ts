import { generateSignupTemplate } from './templates/signup';
import { generateForgotPasswordTemplate } from './templates/forgot-password';

export const TEMPLATE_TYPES = {
  SIGNUP: 'SIGNUP',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};

export const generateEmailContent = ({
  templateType,
  ...templateOptions
}: any) => {
  switch (templateType) {
    case TEMPLATE_TYPES.SIGNUP:
      return generateSignupTemplate(templateOptions);
    case TEMPLATE_TYPES.FORGOT_PASSWORD:
      return generateForgotPasswordTemplate(templateOptions);
    default:
      return '';
  }
};
