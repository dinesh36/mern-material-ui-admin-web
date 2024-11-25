import React, { useEffect, useState } from 'react';
import { Button, IconButton, Popover, Typography, Box } from '@mui/material';
import EditPlanIcon from '../../icons/EditPlanIcon';
import DeletePlanIcon from '../../icons/DeletePlanIcon';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import { useForm, FormProvider } from 'react-hook-form';
import {
  getCircleStyle,
  calendarPopoverStyle,
  colorTitleContainer,
  dateTitleContainer,
  slashStyle,
  getColorCheckbox,
  popoverStyle,
} from './CalendarNoteModal.style';
import { noteColorOptions } from './CalendarNoteModal.constant';
import { PlanNote } from '../../../models/plan-note.type';
import {
  addPlanNote,
  deletePlanNote,
  editPlanNote,
} from '../../services/plan-note-services';
import { Plan } from '../../../models/plan.type';
import DeleteConfirmationDialog from '../../shared/DeleteConfirmationDialog/DeleteConfirmationDialog';
import appColors from '../../shared/appColor';
import { useTheme } from '@mui/material/styles';
import { CalendarNoteForm } from './CalendarNoteForm';
import { formatQty, getPaceLabel } from '../utils/getCurrentMonthDays';

interface PlanCalendarModalProps {
  selectedDate: dayjs.Dayjs | null;
  onClose: () => void;
  plan: Plan;
  note?: PlanNote;
  fetchPlanNotes: () => void;
  anchorPosition: { top: number; left: number };
}

interface FormValues {
  content: string;
  color: string;
  fields: Array<{
    reps: string;
    qty: string;
    type: string;
    pace: string;
    description: string;
  }>;
}

export const CalendarNoteModal: React.FC<PlanCalendarModalProps> = ({
  selectedDate,
  onClose,
  note,
  plan,
  fetchPlanNotes,
  anchorPosition,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false);
  const form = useForm<FormValues>({
    defaultValues: {
      content: '',
      color: noteColorOptions[0].color,
      fields: [
        {
          reps: '',
          qty: '',
          type: '',
          pace: '',
          description: '',
        },
      ],
    },
  });
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const isEdit = note?.fields;
  useEffect(() => {
    form.setValue('color', note?.color || noteColorOptions[0].color);
    form.setValue('content', note?.content || '');
    form.setValue(
      'fields',
      note?.fields || [
        {
          reps: '',
          qty: '',
          type: '',
          pace: '',
          description: '',
        },
      ]
    );
    setIsEditing(!note?.fields);
  }, [note, form]);

  const closeAndRefresh = async () => {
    await fetchPlanNotes();
    onClose();
    setIsEditing(false);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        date: selectedDate,
      };
      if (!isEdit) {
        await addPlanNote(formData, plan?.id as string);
      } else {
        await editPlanNote(formData, note?.id, plan?.id as string);
      }
      await closeAndRefresh();
    } catch {
      /* Do nothing */
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await deletePlanNote(plan?.id as string, note?.id as string);
      await closeAndRefresh();
    } catch {
      /* Do nothing */
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setOpenDeleteConfirmation(true);
  };

  const selectedColorValue = watch('color');

  const renderEditNoteField = () => (
    <FormProvider {...form}>
      <CalendarNoteForm />
      {errors.content && (
        <Typography variant="body2" mt="5px" color="red">
          {errors.content.message}
        </Typography>
      )}
    </FormProvider>
  );

  const renderViewNoteField = () => {
    const colorOption = noteColorOptions.find(
      (option) => option.color === selectedColorValue
    );
    const selectedColorCode = colorOption?.colorCode;

    return (
      <>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Notes
        </Typography>

        <Typography variant="body2" mb="15px" whiteSpace="pre-line">
          {note?.fields.map((field: any) => {
            const setReps = field?.reps ? `${field.reps} X ` : '';
            const qtyDisplay =
              field.type === 'time' ? formatQty(field.qty) : field.qty;
            const description = field.description
              ? ` - ${field.description}`
              : '';

            return (
              <Box key={field._id} display="flex" alignItems="center">
                <Typography display="inline">
                  {`${setReps} ${qtyDisplay} ${field.type} - ${getPaceLabel(field.pace)}${description}`}
                </Typography>
              </Box>
            );
          })}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Color
        </Typography>
        <Box display="flex" alignItems="center">
          <Box
            sx={getCircleStyle(theme, selectedColorCode as string)}
            position="relative"
          >
            {selectedColorCode === appColors.transparent && (
              <Box sx={slashStyle}></Box>
            )}
            {selectedColorValue && (
              <CheckIcon
                sx={getColorCheckbox(theme, selectedColorCode as string)}
              />
            )}
          </Box>
        </Box>
      </>
    );
  };

  const renderColorSelector = () => {
    return (
      <Box mt="20px">
        <Typography sx={colorTitleContainer}>Select Color</Typography>
        <Box display="flex" mt="10px">
          {noteColorOptions.map(({ color, colorCode }) => (
            <Box
              key={color}
              onClick={() => form.setValue('color', color)}
              sx={getCircleStyle(theme, colorCode)}
              position="relative"
            >
              {color === appColors.transparent && <Box sx={slashStyle}></Box>}
              {selectedColorValue === color && (
                <CheckIcon
                  sx={{
                    color:
                      selectedColorValue === appColors.transparent
                        ? theme.palette.black.main
                        : theme.palette.app.white,
                    fontSize: '16px',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderPopoverTitle = () => {
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="10px"
      >
        <Typography sx={dateTitleContainer}>
          {selectedDate?.format('D MMM')}
        </Typography>
        <Box display="flex">
          {isEdit && (
            <>
              <IconButton aria-label="edit" onClick={() => setIsEditing(true)}>
                <EditPlanIcon width={20} height={20} />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeletePlanIcon width={20} height={20} />
              </IconButton>
            </>
          )}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  const renderSaveButton = () => (
    <Box display="flex" justifyContent="flex-end" mt="20px">
      <Button
        disabled={isLoading}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </Button>
    </Box>
  );

  const renderDeleteConfirmModal = () => {
    return (
      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this note?"
      />
    );
  };

  return (
    <Popover
      id={selectedDate ? 'calendar-popover' : undefined}
      open={Boolean(selectedDate)}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            ...calendarPopoverStyle,
            ...popoverStyle,
          },
        },
      }}
      className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper"
    >
      {renderPopoverTitle()}
      {isEditing ? renderEditNoteField() : renderViewNoteField()}
      {isEditing && renderColorSelector()}
      {isEditing && renderSaveButton()}
      {renderDeleteConfirmModal()}
    </Popover>
  );
};
