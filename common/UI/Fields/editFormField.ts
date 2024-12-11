import {
  TextField,
  SelectProfilePhoto,
} from '../../../client/module/shared/form';

interface ValidationRule {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: any, formValues: any) => boolean | string;
  disabled?: boolean; // For fields like email which may be disabled
}

// Define the type for a form field
interface FormField {
  name: string; // Field name
  label?: string; // Optional label for the field
  renderer: React.ComponentType<any>; // Component to render for this field
  rules?: ValidationRule; // Validation rules (optional)
  disabled?: boolean; // Optional property to disable a field
}

export const editFormFields: FormField[] = [
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
