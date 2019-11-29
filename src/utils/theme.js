import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

const theme = {
  primaryColor: '#b2d13d',
  secondaryColor: '#25313f',
  fontDark: '#25313f',
  borderColor: '#d4d6d5',
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
