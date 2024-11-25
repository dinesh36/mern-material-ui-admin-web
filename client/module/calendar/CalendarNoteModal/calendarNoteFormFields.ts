import { TextField } from '../../shared/form';
import { NOTE_FORM_PACE_OPTIONS, NOTE_FORM_TYPE_OPTIONS } from './constants';
import { TimeInput } from '../../shared/form/fields/TimeInput';
import { CalendarModalSelectInput } from '../../shared/form/fields/CalendarModalSelectInput';
import { CalendarFormLabel } from '../../shared/form/fields/CalendarFormLabel';

export const calendarNoteFormFields = ({
  index = 0,
  errors,
  values,
}: {
  index?: number;
  errors?: any;
  values?: any;
}) => {
  return [
    {
      xs: 1.5,
      name: `fields.${index}.reps`,
      label: 'Number',
      rules: {
        pattern: {
          value: /^[0-9]+$/,
          message: 'Please enter only number',
        },
      },
      renderer: TextField,
      fieldProps: {
        placeholder: 'Reps',
        error: errors?.fields?.[index]?.reps,
        helperText: errors?.fields?.[index]?.reps?.message,
        maxLength: 2,
      },
    },
    {
      xs: 0.5,
      name: 'label',
      label: 'Number',
      renderer: CalendarFormLabel,
      fieldProps: {},
    },
    ...(values?.[index]?.type === 'time'
      ? [
          {
            xs: 2,
            name: `fields.${index}.qty`,
            label: 'Time',
            renderer: TimeInput,
            rules: {
              required: 'Qty is required',
              pattern: {
                value: /^[0-9:]+$/,
                message: 'Please enter a valid time (numbers and colons only)',
              },
            },
            fieldProps: {
              placeholder: 'Time',
            },
          },
        ]
      : [
          {
            xs: 2,
            name: `fields.${index}.qty`,
            label: 'Number',
            renderer: TextField,
            rules: {
              required: 'Qty is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Please enter only numbers',
              },
            },
            fieldProps: {
              placeholder: 'Qty',
              error: errors?.fields?.[index]?.qty,
              helperText: errors?.fields?.[index]?.qty?.message,
              maxLength: 4,
            },
          },
        ]),
    {
      xs: 2,
      name: `fields.${index}.type`,
      label: 'Type',
      renderer: CalendarModalSelectInput,
      rules: { required: 'Type is required' },
      fieldProps: {
        placeholder: 'Type',
        options: NOTE_FORM_TYPE_OPTIONS,
        error: errors?.fields?.[index]?.type,
        helperText: errors?.fields?.[index]?.type?.message,
      },
    },
    {
      xs: 2,
      name: `fields.${index}.pace`,
      label: 'Pace',
      renderer: CalendarModalSelectInput,
      rules: { required: 'Pace is required' },
      fieldProps: {
        options: NOTE_FORM_PACE_OPTIONS,
        placeholder: 'Pace',
        error: errors?.fields?.[index]?.pace,
        helperText: errors?.fields?.[index]?.pace?.message,
      },
    },
    {
      xs: 4,
      name: `fields.${index}.description`,
      label: 'Description',
      renderer: TextField,
      fieldProps: {
        placeholder: 'Enter description',
        maxLength: 20,
      },
    },
  ];
};
