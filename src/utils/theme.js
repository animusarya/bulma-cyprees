import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

const theme = {
  mainBrandColor: '#313a46',
  primaryColor: '#3a0256',
  secondaryColor: '#029da8',
  tertiary: '#313a46',
  backgroundColor: '#313a46',
  primaryBackgroundColor: '#2a2d38', // has-background-grey-dark
  menuBackgroundColor: '#2a2d38',
  secondaryBackground: '#37414f',
  tertiaryBackground: '#ECF1F4;',
  forgotPasswordBackground: '#95A5AE', // has-background-grey-light
  borderColor: '#424e5e',
  dangerColor: '#e11842',
  buttonColor: '#8d9bca',

  // Font color
  fontDark: '#25313f',
  textColorLight: '#b5c6cc', // has-text-grey-lighter
  textColorWhite: '#fff', // has-text-white

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
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    color: ${theme.fontDark} !important;
    font-family: 'Poppins', sans-serif !important;
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
  a {
    color: ${theme.primaryColor};
  }
  a.has-text-white:focus, a.has-text-white:hover {
    color: #ffffff!important;
  }
  .swal-button-container {
    display: flex;
    justify-content: center;
  }
  .swal-button {
    background-color: ${theme.secondaryColor};
    font-size: 16px;
  }
  .swal-button--cancel {
    background-color: ${theme.secondaryColor};
    color: #ffffff;
  }
  .swal-footer {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
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

  .is-size-8 {
    font-size: ${theme.fontSizeSmall}
  }
  .has-text-weight-semibold {
    font-weight: 500!important;
  }

  .button.is-primary.is-outlined[disabled] {
    background-color: #eee;
    color: #666;
  }
`;
