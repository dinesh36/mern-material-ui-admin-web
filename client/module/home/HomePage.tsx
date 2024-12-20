import React from 'react';
import { Box, Typography } from '@mui/material';
import { homeContainer, homeContentTitle } from './HomePage.style';
import { Button } from '@mern/ui-shared';

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
      <Button />
    </Box>
  );
};

export default HomePage;
