import { createGlobalStyle } from 'styled-components';

const mainBrandColor = '#4896FC';
const lightAccent = '#f4f5f7';
const darkShades = '#313a46';
const darkAccent = '#000000';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

const theme = {
  mainBrandColor,
  // Use has-background-info-light for backgrounds
  // Accent colors can be used to bring attention to design elements
  darkAccent,
  // Use this color as the background for your dark-on-light designs,
  lightAccent,
  // Another accent color to consider. Not all colors have to be used -
  // sometimes a simple color scheme works best.
  darkShades,
  // Use as the text color for dark-on-light designs,
  // or as the background for inverted designs.
  primaryBackground: '#ffffff',
  secondaryColor: lightAccent,
  backgroundColor: darkShades,

  buttonColor: mainBrandColor,
  dangerColor: '#e11842',

  // border colors
  borderColor: lightAccent,

  // Font color
  fontDark: '#000000', // has-text-black
  textColorWhite: '#ffffff', // has-text-white

  // Font Size
  fontSizeSuperLarge: '30px',
  fontSizeExtraLarge: '24px', // is-size-4
  fontSizeLarge: '20px', // is-size-5
  fontSizeMedium: '18px',
  fontSize: '16px', // is-size-6
  fontSizeSmall: '14px', // is-size-8
  fontSizeExtraSmall: '12px', // is-size-7

  // Font Weight
  fontWeightNormal: 400,
  fontWeightLighter: 500,
  fontWeightBold: 600,
  fontWeightExtraBold: 700,

  // box shadows
  boxShadow: '0 30px 60px 0 rgb(0 0 0 / 12%)',
  buttonShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',

  // Font family
  primaryFontFamily: "'Roboto', sans-serif",
  secondaryFontFamily: "'Rubik', sans-serif",
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    color: ${theme.fontDark} !important;
    font-family: ${theme.primaryFontFamily};
  }
  #root {
    height: 100vh;
  }
  .button.is-primary {
    transition: 0.6s;
    background-color: ${theme.buttonColor};
    color: ${theme.textColorWhite};
    border: 1.5px solid ${theme.buttonColor};
    box-shadow: ${theme.buttonShadow};
    :hover {
      border: 1.5px solid ${theme.buttonColor};
      background-color: transparent;
      color: ${theme.fontDark};
    }
  }

  .has-text-grey-lighter {
    color:${theme.textColorWhite} !important
  }
  .has-background-info-light {
    background-color: ${theme.mainBrandColor} !important;
  }

  .is-family-secondary {
    font-family: ${theme.secondaryFontFamily} !important;
  }
  .is-size-8 {
    font-size: ${theme.fontSizeSmall}
  }
  .has-text-weight-semibold {
    font-weight: 500 !important;
  }

  label {
    color: ${theme.textColorWhite} !important;
    font-weight: 500 !important;
  }
  .select:not(.is-multiple):not(.is-loading)::after {
    border-color: ${theme.fontDark} !important;
  }

  .box,
  .card {
    box-shadow:  ${theme.boxShadow} !important;
  }

  // Table Properties

  .table-container {
    overflow: auto;
    margin-bottom: 1.5rem;
  }
  tr,
  th,
  td {
    vertical-align: middle;
    color: ${theme.darkAccent} !important;
    border-bottom: 2px solid ${theme.borderColor};
    border-top: 2px solid ${theme.borderColor};
    background-color: ${theme.primaryBackground};
  }
  th {
    border-width: 0px 0 1px !important;
  }
`;
