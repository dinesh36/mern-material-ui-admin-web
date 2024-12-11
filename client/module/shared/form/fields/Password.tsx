import React from 'react';
import {
  IconButton,
  InputAdornment,
  TextField as PasswordField,
} from '@mui/material';
import VisibilityOnIcon from '@mern-material-ui-admin-web/common/UI/icons/VisibilityOn';
import VisibilityOffIcon from '@mern-material-ui-admin-web/common/UI/icons/VisibilityOffIcon';

export const Password = ({
  placeholder,
  value,
  onChange,
  error,
  fieldSize,
}: any) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <PasswordField
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      id="password"
      autoComplete="current-password"
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error?.message}
      size={fieldSize}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
