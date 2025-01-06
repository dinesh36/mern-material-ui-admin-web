import { centerContainer } from '../../layout/CommonStyles/CenterContainer.style';
import {
  defaultFontSize,
  defaultLineHeight,
} from '../../layout/CommonStyles/StyleColorVariables';

export const formCardStyle = {
  width: {
    lg: '810px',
  },
  height: 'auto',
  margin: '0 auto',
  padding: {
    xs: '44px 25px',
    md: '44px 30px',
  },
  backgroundColor: 'white',
  border: '0.72px solid #C5C5C5',
  borderRadius: '17px',
};

export const formCardContainer = {
  ...centerContainer,
  fontSize: defaultFontSize,
  lineHeight: defaultLineHeight,
};
