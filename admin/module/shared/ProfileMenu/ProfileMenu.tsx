import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import {
  avatarStyle,
  menuItemStyle,
  menuStyles,
  ProfileMenuContainer,
} from './ProfileMenu.style';
import { LogOutIcon } from '@mern/ui-shared';
import { useRouter } from 'next/router';
import { logoutUser } from '../../redux/slices/auth-slice';
import { useAppDispatch } from '../../redux/store';

const ProfileMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      label: 'Logout',
      icon: <LogOutIcon />,
      style: menuItemStyle,
      key: 'logout',
      onClick: () => {
        dispatch(logoutUser());
        localStorage.clear();
        router.push('/signin');
        handleClose();
      },
    },
  ];

  return (
    <Box sx={ProfileMenuContainer}>
      <Button
          sx={avatarStyle}
          onClick={handleClick}
      >
      Log Out
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={menuStyles}
        disableAutoFocusItem
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick} sx={item.style}>
            {item.icon}
            <Box ml={'20px'}>{item.label}</Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
