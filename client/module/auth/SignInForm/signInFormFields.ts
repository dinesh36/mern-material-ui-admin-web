import { TextField } from '@mern-material-ui-admin-web/common';
import { Password } from '../../shared/form';

export const signInFormFields = [
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
    },
  },
];
