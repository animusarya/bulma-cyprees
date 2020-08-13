import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

const theme = {
  primaryColor: '#b2d13d',
  PrimaryLinkColor: '#BCCF02',
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
      background-color: #8fa735;
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
  .swal-button-container {
    display: flex;
    justify-content: center;
  }
  .swal-button {
    background-color: ${theme.primaryColor};
  }
`;
