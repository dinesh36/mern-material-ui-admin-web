import { Password } from '@mern/ui-shared';
import { passwordValidationRules } from '../passwordValidationRules';

export const changePasswordFormFields = [
  {
    name: 'oldPassword',
    label: 'Old Password',
    renderer: Password,
    rules: {
      required: 'This field is required',
    },
  },
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
