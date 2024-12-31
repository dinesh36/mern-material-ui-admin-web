export const ProfileMenuContainer = {
  display: 'flex',
  alignItems: 'center',
};

export const avatarStyle = {
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  padding: '11px 0px',
  color: 'white',
};

export const menuStyles = (theme: any) => ({
  '& .MuiPaper-root': {
    border: `1px solid ${theme.palette.border.radioButtonBorder}`,
    borderRadius: '6px',
    minWidth: '232px',
    padding: '25px',
    margin: '7px 0px 0px 36px',
  },
  '& .css-6hp17o-MuiList-root-MuiMenu-list': {
    padding: '0',
  },
});

export const menuItemStyle = (theme: any) => ({
  fontWeight: 700,
  padding: '0px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '& svg path': {
      stroke: theme.palette.primary.main,
    },
  },
});
