import { centerContainer } from '../../layout/CommonStyles/CenterContainer.style';
import {
  defaultFontSize,
  defaultLineHeight,
} from '../../layout/CommonStyles/StyleColorVariables';

export const formCardStyle = (theme: any) => ({
  width: {
    lg: '810px',
  },
  height: 'auto',
  margin: '0 auto',
  padding: {
    xs: '44px 25px',
    md: '44px 30px',
  },
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : 'white',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
  border: `0.72px solid ${theme.palette.mode === 'dark' ? '#444' : '#C5C5C5'}`,
  borderRadius: '17px',
});

export const formCardContainer = (theme: any) => ({
  ...centerContainer,
  fontSize: defaultFontSize,
  lineHeight: defaultLineHeight,
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#FFFFFF',
});
