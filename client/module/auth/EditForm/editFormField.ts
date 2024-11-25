import {
  TextField,
  SelectProfilePhoto,
  SelectTypeRadio,
} from '../../shared/form';
import { CheckboxGroup } from '../../shared/form/fields/CheckboxGroup/CheckboxGroup';

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
  {
    name: 'type',
    label: 'Select Type',
    renderer: CheckboxGroup,
    rules: {
      required: 'Please select a type',
    },
    fieldProps: {
      options: [
        { label: 'Coach', value: 'coach' },
        { label: 'Athlete', value: 'athlete' },
      ],
    },
  },
  {
    name: 'measurementType',
    label: 'Select Measurement Type',
    renderer: SelectTypeRadio,
    rules: {
      required: 'Please select a measurementType',
    },
    fieldProps: {
      options: [
        { label: 'KMs', value: 'KMs' },
        { label: 'Miles', value: 'miles' },
      ],
    },
  },
];
