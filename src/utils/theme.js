import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

const theme = {
  mainBrandColor: '#313a46',
  secondaryColor: '#394452',
  backgroundColor: '#313a46',
  primaryBackgroundColor: '#2a2d38', // has-background-grey-dark
  menuBackgroundColor: '#313541',
  sidebarBackground: '#313541',
  secondaryBackground: '#37414f',
  tertiaryBackground: '#ECF1F4;',
  forgotPasswordBackground: '#95A5AE', // has-background-grey-light
  borderColor: '#424e5e',
  secondaryBorderColor: '#394452',
  dangerColor: '#e11842',
  buttonColor: '#8d9bca',

  // Font color
  fontDark: '#25313f',
  fontExtraDark: '#6c757d',
  textColorLight: '#b5c6cc', // has-text-grey-lighter
  textColorWhite: '#fff', // has-text-white
  textColorGrey: '#98abb9', // has-text-primary-light
  textColorBlueLight: '#909ecc', // :hover has-text-primary-light

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
    :hover {
      border: 1px solid #029da8;
      background-color: #029da8;
      color: ${theme.textColorWhite};
      transition: 0.6s;
    }
  }

  .has-text-grey-lighter {
    color:${theme.textColorLight} !important
  }
  .has-background-grey-light {
    background-color: ${theme.forgotPasswordBackground}!important;
  }
  .has-background-grey-dark {
    background-color: ${theme.primaryBackgroundColor}!important;
  }
  .has-background-white-ter {
    background-color: #F4F6F6 !important;
  }

  .has-text-primary-light,
  a.has-text-primary-light:focus, a.has-text-primary-light:hover {
    color: ${theme.textColorGrey} !important;
    :hover {
      color: ${theme.textColorBlueLight} !important;
      transition: all 0.4s;
    }
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
    color: ${theme.textColorLight} !important;
    font-weight: 500 !important;
  }
  .select:not(.is-multiple):not(.is-loading)::after {
    border-color: ${(props) => props.theme.textColorLight} !important;
  }

  // Table Properties
  .table-container {
    overflow: auto;
    margin-bottom: 1.5rem;
  }
  table {
    width: 100%;
  }
  tr,
  th,
  td {
    vertical-align: middle;
    color: ${(props) => props.theme.textColorWhite} !important;
    border-bottom: 2px solid ${(props) => props.theme.borderColor};
    border-top: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.backgroundColor};
  }
  th {
    border-width: 0px 0 1px !important;
  }
`;
