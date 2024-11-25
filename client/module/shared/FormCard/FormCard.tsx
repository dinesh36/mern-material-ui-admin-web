import React from 'react';
import { Box, Typography } from '@mui/material';
import { formCardContainer, formCardStyle } from './FormCard.style';

interface FormContainerProps {
  children: React.ReactNode;
  sx?: any;
  title?: string;
}

const FormCard: React.FC<FormContainerProps> = ({ children, title }) => {
  return (
    <Box
      sx={formCardContainer}
      display="flex"
      alignItems="start"
      justifyContent="center"
    >
      <Box>
        {title && (
          <Typography
            variant="h4"
            textAlign="center"
            mb={'34px'}
            mt={'80px'}
            fontWeight={700}
          >
            {title}
          </Typography>
        )}
        <Box sx={formCardStyle}>{children}</Box>
      </Box>
    </Box>
  );
};

export default FormCard;
