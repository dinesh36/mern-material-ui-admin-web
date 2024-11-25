import React  from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { planContainer, planContentTitle } from './HomePage.style';

const HomePage: React.FC = () => {

  const renderHeader = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3.75}
      mb={3.75}
    >
      <Typography variant="h4" sx={planContentTitle}>
        This is a user home page
      </Typography>
    </Box>
  );

  return (
    <Box sx={planContainer}>
      {renderHeader()}
    </Box>
  );
};

export default HomePage;
