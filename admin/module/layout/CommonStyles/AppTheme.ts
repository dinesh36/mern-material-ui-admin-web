/* eslint-disable no-restricted-syntax */
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary'];
  }

  interface PaletteOptions {
    black?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    border: {
      whiteButtonBorder: string;
      radioButtonBorder: string;
      defaultFieldBorder: string;
      fieldHoverBorder: string;
      cardBorder: string;
      formCardBorder: string;
    };
  }

  interface PaletteOptions {
    border?: {
      whiteButtonBorder?: string;
      radioButtonBorder?: string;
      defaultFieldBorder?: string;
      fieldHoverBorder?: string;
      cardBorder?: string;
      formCardBorder?: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    app: {
      lightGray: string;
      grayText: string;
      white: string;
    };
  }

  interface PaletteOptions {
    app?: {
      lightGray?: string;
      grayText?: string;
      white?: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    card: {
      background: string;
    };
  }

  interface PaletteOptions {
    card?: {
      background?: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    gray: {
      main: string;
    };
  }

  interface PaletteOptions {
    gray?: {
      main?: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    fill: {
      gray: string;
    };
  }

  interface PaletteOptions {
    fill?: {
      gray?: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    container: {
      backgroundColor: string;
    };
  }

  interface PaletteOptions {
    container?: {
      backgroundColor?: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    textColor: {
      textGray: string;
      black: string;
    };
  }

  interface PaletteOptions {
    textColor?: {
      textGray?: string;
      black?: string;
    };
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'DM Sans, sans-serif',
  },
  palette: {
    primary: {
      main: '#195CE5',
    },
    background: {
      default: '#FAFAFA',
    },
    app: {
      lightGray: '#FBFBFB',
      grayText: '#9f9f9f',
      white: '#FFFFFF',
    },
    card: {
      background: '#ebebec',
    },
    border: {
      whiteButtonBorder: '#E5E8EB',
      radioButtonBorder: '#EFEFEF',
      defaultFieldBorder: '#c0c0c0',
      fieldHoverBorder: 'rgba(0, 0, 0, 0.87)',
      cardBorder: '#dfdfe0',
      formCardBorder: '#C5C5C5',
    },
    black: {
      main: '#000000',
    },
    gray: {
      main: '#9D9CA3',
    },
    fill: {
      gray: '#6C6C6C',
    },
    container: {
      backgroundColor: '#021E35',
    },
    textColor: {
      textGray: '#c0c0c0',
      black: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '18px',
          padding: '11px 26px',
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            border: `1px solid ${theme.palette.border.whiteButtonBorder}`,
          }),
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: '100%',
          backgroundColor: theme.palette.background.default,
          '& .MuiFormHelperText-root': {
            backgroundColor: theme.palette.app.white,
            margin: '0px',
            paddingTop: '8px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.border.defaultFieldBorder,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.border.fieldHoverBorder,
            },
            '&.Mui-error fieldset': {
              borderColor: theme.palette.border.defaultFieldBorder,
            },
          },
          '& .MuiInputBase-input': {
            padding: '11.4px 11px',
            fontSize: '12px',
            lineHeight: '16px',
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px',
            transform: 'translate(14px, 12px) scale(1)',
          },
        }),
      },
      variants: [
        {
          props: { size: 'medium' },
          style: {
            '& .MuiInputBase-input': {
              padding: '16px 20px',
              fontSize: '18px',
            },
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          borderRadius: '3px',
          '& .MuiInputBase-input': {
            height: '40px',
            fontSize: '12px',
            paddingLeft: '12px',
            lineHeight: '40px',
            paddingTop: '0px',
            paddingBottom: '0px',
            color: theme.palette.app.grayText,
            fontFamily: 'DM Sans, sans-serif',
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '10px 0px 0px 0px',
          fontWeight: '500',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.border.defaultFieldBorder,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: 'flex',
          backgroundColor: theme.palette.card.background,
          borderRadius: '20px',
          boxShadow: 'none',
          border: `1px solid ${theme.palette.border.cardBorder}`,
          overflow: 'hidden',
          flexDirection: 'column',
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '29px 20px 0px 20px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flex: '1 0 auto',
          '& .MuiCardContent-root': {
            padding: '0px',
          },
          '& .MuiTypography-h6': {
            fontSize: '16px',
            fontWeight: 700,
          },
          '& .MuiTypography-body2': {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 3,
            marginTop: '10px',
            marginBottom: '10px',
            fontWeight: 400,
            fontSize: '14px',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-end',
          padding: '0px',
          marginRight: '22px',
          marginTop: '20px',
          marginBottom: '22px',
        },
      },
    },
  },
});
