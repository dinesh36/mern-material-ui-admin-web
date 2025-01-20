import { TextField } from '@mern/ui-shared';
import {SelectProfilePhoto} from "@/module/auth/SelectProfilePhoto/SelectProfilePhoto";

export const editFormFields = [
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
    disabled: true,
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
