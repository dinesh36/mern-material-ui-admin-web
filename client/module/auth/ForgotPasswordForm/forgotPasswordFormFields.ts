import { TextField } from '../../shared/form';

export const forgotPasswordFormFields = [
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
];
