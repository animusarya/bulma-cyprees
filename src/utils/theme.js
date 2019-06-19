import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

// http://chir.ag/projects/name-that-color/
export const colors = {
  white: '#fff',
  black: '#000000',
  blue: '#100065',
  pumpkin: '#fffff',
  Gray: '#9a9a9b',
  grayChateau: '#8f8f8f',
  blueColor: '#633991',
  backgroundColor: '#f9f9ff'
};

export const sizes = {
  extraSmall: '14px',
  small: '22px',
  normal: '48px',
  medium: '28px',
  large: '52px'
};

const theme = {
  primaryColor: '#C3D422',
  SecodryColor: '#C3D422',
  GrayColor: 'gainsboro',
  secondaryColor: colors.riptide,
  primaryFontFamily: '"Quicksand", sans-serif',
  secondaryFontFamily: '"Open Sans", sans-serif',
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  fontSizeReguar: '400',
  borderColor: '#D6D6D6',
  fontDark: colors.brightGray,
  fontLight: colors.regentGray,
  blueColor: colors.blueColor,
  labelColorDark: colors.regentGray,
  fieldGreyColor: colors.grey,
  fontSizeNormal: sizes.normal,
  fontSizeLarge: sizes.large,
  fontSizeMedium: sizes.medium,
  fontSizeSmall: sizes.small,
  fontSizeExtraSmall: sizes.extraSmall,
  backgroundColor: colors.backgroundColor
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: #ffff;
  }
  .hero-body{
    padding:0;
  }
`;
