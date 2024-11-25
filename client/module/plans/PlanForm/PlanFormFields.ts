import { TextField, TextArea, SelectInput, DateInput } from '../../shared/form';
import dayjs from 'dayjs';

export const planFormFields = [
  {
    name: 'title',
    rules: {
      required: 'This field is required',
      maxLength: {
        value: 50,
        message: 'Title must be 50 characters or less',
      },
    },
    label: 'Title',
    renderer: TextField,
  },
  {
    name: 'description',
    rules: {
      required: 'This field is required',
      maxLength: {
        value: 500,
        message: 'Description must be 500 characters or less',
      },
    },
    label: 'Description',
    renderer: TextArea,
    fieldProps: {
      minRows: 4,
      maxRows: 8,
    },
  },
  {
    xs: 6,
    name: 'startDate',
    rules: { required: 'This field is required' },
    label: 'Start Date',
    renderer: DateInput,
    fieldProps: {
      minDate: dayjs().format('YYYY-MM-DD'),
      maxRows: 8,
    },
  },
  {
    xs: 6,
    name: 'weeks',
    rules: { required: 'This field is required' },
    label: 'Total Weeks',
    renderer: SelectInput,
    fieldProps: {
      minDate: dayjs().format('YYYY-MM-DD'),
      options: [...Array(52)].map((_, i) => i + 1),
    },
  },
];
