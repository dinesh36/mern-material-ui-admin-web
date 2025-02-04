import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { formCardContainer, formCardStyle } from './FormCard.style';

interface FormContainerProps {
  children: React.ReactNode;
  sx?: any;
  title?: string;
}

const FormCard: React.FC<FormContainerProps> = ({ children, title }) => {
  const theme = useTheme();

  return (
    <Box
      sx={formCardContainer(theme)}
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
        <Box sx={formCardStyle(theme)}>{children}</Box>
      </Box>
    </Box>
  );
};

export default FormCard;
