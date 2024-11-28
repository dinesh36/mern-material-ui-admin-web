import React, { useEffect, useState } from 'react';
import { Box, Avatar, IconButton, Typography } from '@mui/material';
import {
  selectProfileEditIconStyle,
  selectProfilePhotoStyle,
} from './SelectProfilePhoto.style';
import EditProfileIcon from '../../../../icons/EditProfileIcon';

interface SelectProfilePhotoProps {
  value: string;
  onChange: (event: File) => void;
  error?: any;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
];

export const SelectProfilePhoto: React.FC<SelectProfilePhotoProps> = ({
  value,
  onChange,
  error,
}) => {
  const [photo, setPhoto] = useState<string>(value || '');
  const [fileError, setFileError] = useState<string | null>(null);

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size exceeds the 3MB limit.');
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError(
          'Invalid file type. Only PNG, JPG, JPEG, and WEBP are allowed.'
        );
        return;
      }
      setFileError(null);
      onChange(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setPhoto(value);
  }, [value]);

  return (
    <Box display="flex" alignItems="center" mt={'-12px'}>
      <Box position="relative">
        <Avatar src={photo} sx={selectProfilePhotoStyle} />
        <IconButton component="label" sx={selectProfileEditIconStyle}>
          <EditProfileIcon />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoChange}
          />
        </IconButton>
      </Box>
      <Typography variant="h6" ml={'29px'}>
        Profile Photo
      </Typography>
      {(fileError || error) && (
        <Typography color="error" marginLeft={'12px'}>
          {fileError || error.message}
        </Typography>
      )}
    </Box>
  );
};
