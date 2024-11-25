import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import React from 'react';

export const CalendarFormLabel = () => {
  return (
    <IconButton
      edge="end"
      color="inherit"
      aria-label="close"
      style={{
        pointerEvents: 'none',
        opacity: 0.5,
        marginTop: '7px',
        padding: 0,
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
