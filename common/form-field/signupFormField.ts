import { TextField } from '../UI/TextField';
import { Password } from '../UI/Password';
import { SelectProfilePhoto } from '../../client/module/shared/form';
import { passwordValidationRules } from '../../client/module/auth/passwordValidationRules';

export const signUpFormFields = [
  {
    name: 'profileImage',
    renderer: SelectProfilePhoto,
    rules: {
      required: 'Please upload a profile photo',
    },
  },
  {
    name: 'name',
    label: 'Name',
    renderer: TextField,
    rules: {
      required: 'This field is required',
    },
  },
  {
    name: 'email',
    label: 'Email',
    renderer: TextField,
    rules: {
      required: 'This field is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
    },
  },
  {
    name: 'password',
    label: 'Password',
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
      validate: (value: any, formValues: { password: any }) =>
        value === formValues.password || 'Passwords do not match',
      ...passwordValidationRules,
    },
  },
];
