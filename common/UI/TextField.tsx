// import React from 'react';
// import { TextField as MuiTextField } from '@mui/material';
//
// export const TextField = ({
//   placeholder,
//   value,
//   onChange,
//   error,
//   maxLength,
//   disabled,
//   fieldSize = 'small',
// }: any) => {
//   return (
//     <MuiTextField
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       error={Boolean(error)}
//       helperText={error?.message}
//       inputProps={{ maxLength }}
//       fullWidth
//       size={fieldSize}
//     />
//   );
// };
import React from 'react';

interface TextFieldProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: { message: string };
    maxLength?: number;
    disabled?: boolean;
    fieldSize?: 'small' | 'medium' | 'large';
}

export const TextField: React.FC<TextFieldProps> = ({
                                                        placeholder,
                                                        value,
                                                        onChange,
                                                        error,
                                                        maxLength,
                                                        disabled,
                                                        fieldSize = 'small',
                                                    }) => {
    const sizeStyles = {
        small: { padding: '8px', fontSize: '14px' },
        medium: { padding: '10px', fontSize: '16px' },
        large: { padding: '12px', fontSize: '18px' },
    };

    return (
        <div style={{ width: '100%' }}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                disabled={disabled}
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    border: '1px solid',
                    // borderColor: error ? 'red' : '#ccc',
                    borderRadius: '4px',
                    ...sizeStyles[fieldSize],
                }}
            />
            {error && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {error.message}
                </div>
            )}
        </div>
    );
};
