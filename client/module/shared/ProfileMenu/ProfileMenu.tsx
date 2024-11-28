import React, { useState } from 'react';
import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import {
  avatarStyle,
  editProfileStyle,
  menuItemStyle,
  menuStyles,
  ProfileMenuContainer,
} from './ProfileMenu.style';
import UserIcon from '../../icons/UserIcon';
import KeyIcon from '../../icons/KeyIcon';
import LogOutIcon from '../../icons/LogOutIcon';
import { useRouter } from 'next/router';
import { logoutUser } from '../../redux/slices/auth-slice';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { User } from '../../../models/auth.type';

const ProfileMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profileImage, name } = useSelector<RootState>(
    (state: RootState) => state.auth.user
  ) as User;
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
      label: 'Edit Profile',
      icon: <UserIcon />,
      style: editProfileStyle,
      key: 'edit-profile',
      onClick: () => {
        router.push('/edit-profile');
        handleClose();
      },
    },
    {
      label: 'Change Password',
      icon: <KeyIcon />,
      style: menuItemStyle,
      key: 'change-password',
      onClick: () => {
        router.push('/change-password');
        handleClose();
      },
    },
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
      <Avatar
        src={profileImage || 'default_image_path.jpg'}
        alt={name || 'User Avatar'}
        sx={avatarStyle}
        onClick={handleClick}
      />
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
