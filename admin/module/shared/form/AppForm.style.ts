export const submitButton = (theme: {
  palette: { mode: string };
}) => ({
  padding: '16px 20px',
  width: '205px',
  fontSize: '18px',
  backgroundColor: '#195CE5',
  color: '#FFFFFF',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#195CE5',
    boxShadow: 'none',
  },
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: '#195CE5',
    '&:hover': {
      backgroundColor: '#195CE5',
      boxShadow: 'none',
    },
  }),
});

export const submitButtonContainer = {
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  marginTop: '30px',
};
