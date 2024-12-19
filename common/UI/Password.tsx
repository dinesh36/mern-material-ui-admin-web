// import React from 'react';
// import {
//   IconButton,
//   InputAdornment,
//   TextField as PasswordField,
// } from '@mui/material';
// import VisibilityOnIcon from '../../../icons/VisibilityOn';
// import VisibilityOffIcon from '../../../icons/VisibilityOffIcon';
//
// export const Password = ({
//   placeholder,
//   value,
//   onChange,
//   error,
//   fieldSize,
// }: any) => {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//
//   return (
//     <PasswordField
//       variant="outlined"
//       fullWidth
//       placeholder={placeholder}
//       type={showPassword ? 'text' : 'password'}
//       id="password"
//       autoComplete="current-password"
//       value={value}
//       onChange={onChange}
//       error={Boolean(error)}
//       helperText={error?.message}
//       size={fieldSize}
//       InputProps={{
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton
//               aria-label="toggle password visibility"
//               onClick={handleClickShowPassword}
//               edge="end"
//             >
//               {showPassword ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//     />
//   );
// };
import React from 'react';
import VisibilityOffIcon from "../Icons/VisibilityOffIcon";
import VisibilityOn from "../Icons/VisibilityOn";

interface PasswordProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: { message: string };
    fieldSize?: 'small' | 'medium' | 'large';
    showPassword: boolean;
    onToggleVisibility: () => void;
}

export const Password: React.FC<PasswordProps> = ({
                                                      placeholder,
                                                      value,
                                                      onChange,
                                                      error,
                                                      fieldSize = 'medium',
                                                      showPassword,
                                                      onToggleVisibility,
                                                  }) => {
    const sizeStyles = {
        small: { padding: '8px', fontSize: '14px' },
        medium: { padding: '10px', fontSize: '16px' },
        large: { padding: '12px', fontSize: '18px' },
    };

    return (
        <div style={{ width: '100%' }}>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid',
                        borderRadius: '4px',
                        ...sizeStyles[fieldSize],
                    }}
                />
                <button
                    type="button"
                    onClick={onToggleVisibility}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {showPassword ? <VisibilityOffIcon/> : <VisibilityOn/>}
                </button>
            </div>
            {error && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {error.message}
                </div>
            )}
        </div>
    );
};

