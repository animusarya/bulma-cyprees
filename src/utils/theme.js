import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

const theme = {
  primaryColor: '#79B5DB',
  secondaryColor: '#25313f',
  fontDark: '#25313f',
  borderColor: '#d4d6d5',
  menuBackgroundColor: '#231f20',
  fontSizeSuperLarge: '30px',
  fontSizeExtraLarge: '26px',
  fontSizeLarge: '20px',
  fontSizeMedium: '18px',
  fontSize: '16px',
  fontSizeSmall: '14px',
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
    background-color: ${theme.primaryColor};
    :hover {
      background-color: ${theme.secondaryColor};
      transition: 0.6s;
    }
  }
  .button.is-info {
    background-color: ${theme.secondaryColor};
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
    background-color: ${theme.primaryColor};
    font-size: 16px;
  }
  .swal-button--cancel {
    background-color: ${theme.primaryColor};
    color: #ffffff;
  }
  .swal-footer {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
  }
`;
