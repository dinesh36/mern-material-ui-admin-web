import { centerContainer } from '../CommonStyles/CenterContainer.style';

export const MainStyles = (theme: {
  palette: { container: { backgroundColor: any } };
}) => ({
  backgroundColor: theme.palette.container.backgroundColor,
  display: 'flex',
  alignItems: 'center',
  padding: '0 28px',
  paddingRight: '83px',
  justifyContent: 'space-between',
});

export const containerStyles = (theme: {
  palette: { app: { white: any } };
}) => ({
  ...centerContainer,
  display: 'flex',
  alignItems: 'center',
  paddingTop: '9px',
  paddingBottom: '9px',
  fontSize: '16px',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: '700',
  color: theme.palette.app.white,
  gap: '10px',
  textDecoration: 'none',
});
