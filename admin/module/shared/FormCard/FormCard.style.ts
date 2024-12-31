import { centerContainer } from '../../layout/CommonStyles/CenterContainer.style';
import {
  defaultFontSize,
  defaultLineHeight,
} from '../../layout/CommonStyles/StyleColorVariables';

export const formCardStyle = (theme: {
  palette: { app: { white: any }; border: { formCardBorder: any } };
}) => ({
  width: {
    lg: '810px',
  },
  height: 'auto',
  margin: '0 auto',
  padding: {
    xs: '44px 25px',
    md: '44px 30px',
  },
  backgroundColor: theme.palette.app.white,
  border: `0.72px solid ${theme.palette.border.formCardBorder}`,
  borderRadius: '17px',
});

export const formCardContainer = {
  ...centerContainer,
  fontSize: defaultFontSize,
  lineHeight: defaultLineHeight,
};
