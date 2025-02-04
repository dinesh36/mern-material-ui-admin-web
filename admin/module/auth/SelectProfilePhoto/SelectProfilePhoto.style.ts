export const selectProfilePhotoStyle = (theme: { palette: { grey: any } }) => ({
  width: 100,
  height: 100,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[500],
  border: `1px solid ${theme.palette.grey[300]}`,
});

export const selectProfileEditIconStyle = (theme: {
  palette: { primary: { main: any }, mode: string };
}) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: "#195CE5",
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#195CE5',
  },
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: '#195CE5',
    '&:hover': {
      backgroundColor: '#195CE5',
    },
  }),
});
