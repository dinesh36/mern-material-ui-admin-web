import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  addButtonNoteModal,
  colorTitleContainer,
} from './CalendarNoteModal.style';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FieldGroup } from '../../shared/form';
import DeletePlanIcon from '../../icons/DeletePlanIcon';
import PlusIcon from '../../icons/PlusIcon';
import { calendarNoteFormFields } from './calendarNoteFormFields';

export const CalendarNoteForm = () => {
  const theme = useTheme();
  const form = useFormContext();
  const {
    control,
    watch,
    formState: { errors },
  } = form;
  const selectedFieldsValue = watch('fields');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });
  const renderFormTitle = () => {
    return (
      <Box sx={{ display: 'flex', gap: '115px', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={colorTitleContainer}>
          Reps
        </Typography>
        <Typography variant="subtitle1" sx={colorTitleContainer}>
          Qty
        </Typography>
        <Typography variant="subtitle1" sx={colorTitleContainer}>
          Type
        </Typography>
        <Box sx={{ display: 'flex', gap: '84px' }}>
          <Typography
            variant="subtitle1"
            sx={{
              ...colorTitleContainer,
              fontSize: '12px',
              fontWeight: 500,
              color: theme.palette.textColor.black,
            }}
          >
            Pace
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              ...colorTitleContainer,
              ml: '28px',
              fontSize: '12px',
              fontWeight: 500,
              color: theme.palette.textColor.black,
            }}
          >
            Description
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderDynamicForm = () => {
    return (
      <>
        {fields?.map((field, index) => (
          <Box sx={{ mt: '10px', display: 'flex' }}>
            <FieldGroup
              formFields={calendarNoteFormFields({
                index,
                errors,
                values: selectedFieldsValue,
              })}
            />
            <Box>
              {fields.length >= 0 && (
                <IconButton onClick={() => remove(index)}>
                  <DeletePlanIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}

        {fields.length < 8 && (
          <Box
            display="flex"
            justifyContent="flex-start"
            gap="10px"
            padding="10px"
            paddingLeft="20px"
            marginLeft="-19px"
          >
            <Button
              sx={addButtonNoteModal}
              onClick={() =>
                append({
                  reps: '',
                  qty: '',
                  type: '',
                  pace: '',
                  description: '',
                })
              }
            >
              <PlusIcon /> &nbsp; Add
            </Button>
          </Box>
        )}
      </>
    );
  };
  return (
    <>
      {renderFormTitle()}
      {renderDynamicForm()}
    </>
  );
};
