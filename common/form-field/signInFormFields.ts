import { TextField } from '../UI/TextField';
import { Password } from '../UI/Password';


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
