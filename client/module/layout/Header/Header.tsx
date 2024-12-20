import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { AppIcon } from '@mern/ui-shared';
import { containerStyles, MainStyles } from './Header.style';
import ProfileMenu from '../../shared/ProfileMenu/ProfileMenu';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  const isUserLoggedIn = useSelector<RootState>(
    (state: RootState) => state.auth.isUserLoggedIn
  ) as boolean;

  return (
    <Box sx={MainStyles}>
      <Link sx={containerStyles} href="/">
        <AppIcon />
        <Typography fontWeight="bold">MERN App</Typography>
      </Link>

      {isUserLoggedIn && <ProfileMenu />}
    </Box>
  );
};

export default Header;
