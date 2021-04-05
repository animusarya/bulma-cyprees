import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

const theme = {
  mainBrandColor: '#313a46',
  secondaryColor: '#394452',
  tertiary: '#313a46',
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
  .table {
    thead {
      background-color: #ecedf0;
    }
  }
  .button.is-primary {
    transition: 0.6s;
    background-color: ${theme.buttonColor};
    color: ${theme.textColorWhite};
    :hover {
      border: 1px solid ${theme.secondaryColor};
      background-color: ${theme.secondaryColor};
      color: ${theme.textColorWhite};
      transition: 0.6s;
    }
  }
  .button.is-info {
    background-color: ${theme.buttonColor};
    :hover {
      background-color: #11161d;
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

  .button.is-primary.is-outlined[disabled] {
    background-color: #eee;
    color: #666;
  }
  label {
    color: ${theme.textColorLight} !important;
    font-weight: 500 !important;
  }
  .select:not(.is-multiple):not(.is-loading)::after {
    border-color: ${(props) => props.theme.textColorLight} !important;
  }
  .table-wrapper {
  overflow: auto;
  border-radius: 10px;
}
td {
    font-weight: 400 !important;
    padding: 1.3rem !important;
    background: ${theme.backgroundColor} !important;
    border-top: 1px solid ${theme.borderColorLight} !important;
    border-bottom: 1px solid ${theme.borderColorLight} !important;
    border-bottom-width: 1px !important;
    color: ${theme.darkAccent} !important;
  }
`;
