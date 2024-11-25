import appColors from '../../shared/appColor';

export const getCircleStyle = (
  theme: { palette: { app: { white: any }; black: { main: any } } },
  color: string
) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: color,
  margin: '0 20px 0px 0px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border:
    color === appColors.transparent
      ? `1px solid ${theme.palette.black.main}`
      : 'none',
});

export const calendarPopoverStyle = {
  padding: '16px',
  width: '340px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: 1300,
};

export const popoverStyle = {
  padding: '20px',
  borderRadius: '10px',
  width: '900px',
};

export const getColorCheckbox = (theme: any, color: string) => {
  return {
    color:
      color === appColors.transparent
        ? theme.palette.black.main
        : theme.palette.app.white,
    fontSize: '16px',
    position: 'absolute',
    top: '3px',
    left: '3px',
  };
};

export const colorTitleContainer = (theme: {
  palette: { textColor: { black: any } };
}) => ({
  color: theme.palette.textColor.black,
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '12px',
});

export const dateTitleContainer = (theme: {
  palette: { textColor: { black: any } };
}) => ({
  color: theme.palette.textColor.black,
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '22px',
});

export const slashStyle = (theme: {
  palette: { textColor: { black: any } };
}) => ({
  content: '""',
  position: 'absolute',
  width: '1px',
  height: '23px',
  backgroundColor: theme.palette.textColor.black,
  transform: 'rotate(41deg)',
});

export const typeQutStyle = {
  width: '124px',
};

export const descriptionInputStyle = {
  width: '327px',
};

export const qtyStyle = {
  paddingBottom: '10px',
  fontSize: '12px',
  lineHeight: '0px',
  mt: '-16px',
  fontWeight: 500,
  ml: '140px',
};

export const descriptionStyle = {
  paddingBottom: '10px',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '0px',
  mt: '-10px',
  ml: '276px',
};
export const selectTypeNoteModal = (theme: {
  palette: { textColor: { black: any } };
}) => ({
  '.MuiSelect-select': {
    color: theme.palette.textColor.black,
    width: '200px',
  },
});
export const addButtonNoteModal = (theme: {
  palette: {
    textColor: { black: any };
    gray: { main: any };
  };
}) => ({
  border: `1px solid ${theme.palette.gray.main}`,
  borderRadius: '4px',
  color: theme.palette.textColor.black,
  padding: '7px 13px',
});
