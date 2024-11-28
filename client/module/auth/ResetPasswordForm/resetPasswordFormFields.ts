import { Password } from '../../shared/form';
import { passwordValidationRules } from '../passwordValidationRules';

export const resetPasswordFormFields = [
  {
    name: 'newPassword',
    label: 'New Password',
    renderer: Password,
    rules: {
      required: 'This field is required',
      ...passwordValidationRules,
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    renderer: Password,
    rules: {
      required: 'This field is required',
      validate: (value: string, formValues: { newPassword: string }) =>
        value === formValues.newPassword || 'Passwords do not match',
      ...passwordValidationRules,
    },
  },
];
