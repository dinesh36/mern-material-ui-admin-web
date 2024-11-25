import { centerContainer } from '../CommonStyles/CenterContainer.style';

import {
  defaultFontSize,
  defaultLineHeight,
} from '../CommonStyles/StyleColorVariables';

export const breadcrumbContainer = (theme: {
  palette: { gray: { main: any } };
}) => ({
  ...centerContainer,
  margin: '20px 0 25px 0',
  color: theme.palette.gray.main,
  fontSize: defaultFontSize,
  lineHeight: defaultLineHeight,
});

export const activeText = (theme: {
  palette: { textColor: { black: any } };
}) => ({
  color: theme.palette.textColor.black,
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '24px',
});

export const planLink = (theme: { palette: { gray: { main: any } } }) => ({
  color: theme.palette.gray.main,
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '24px',
});
