import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  DeleteConfirmationDialogActions,
  DeleteConfirmationDialogContent,
  DeleteConfirmationDialogTitle,
} from './DeleteConfirmationDialog.style';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  message,
}) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const onDeleteConfirm = async () => {
    try {
      setIsDeleteLoading(true);
      await onConfirm();
    } catch {
      /* Do nothing */
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { padding: '20px', borderRadius: '10px' } }}
    >
      <DialogTitle sx={DeleteConfirmationDialogTitle}>
        Confirm Delete
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={DeleteConfirmationDialogContent}>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={DeleteConfirmationDialogActions}>
        <Button onClick={onClose} color="primary" disabled={isDeleteLoading}>
          Cancel
        </Button>
        <Button
          onClick={onDeleteConfirm}
          disabled={isDeleteLoading}
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
