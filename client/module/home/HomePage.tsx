import React  from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { homeContainer, homeContentTitle } from './HomePage.style';

const HomePage: React.FC = () => {

  const renderHeader = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3.75}
      mb={3.75}
    >
      <Typography variant="h4" sx={homeContentTitle}>
        This is a user home page
      </Typography>
    </Box>
  );

  return (
    <Box sx={homeContainer}>
      {renderHeader()}
    </Box>
  );
};

export default HomePage;
