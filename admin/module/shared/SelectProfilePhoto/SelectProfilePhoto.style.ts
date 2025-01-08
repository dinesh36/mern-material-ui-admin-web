export const selectProfilePhotoStyle = (theme: { palette: { grey: any } }) => ({
  width: 100,
  height: 100,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[500],
  border: `1px solid ${theme.palette.grey[300]}`,
});

export const selectProfileEditIconStyle = (theme: {
  palette: { primary: { main: any } };
}) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
});
