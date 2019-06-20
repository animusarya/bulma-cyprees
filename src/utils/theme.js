import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800, ipadBreakpoint: 1024 };

export const sizes = {
  extraSmall: '14px',
  small: '22px',
  normal: '48px',
  medium: '28px',
  large: '52px'
};

const theme = {
  fontDark: '#231f20',
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    color: #231f20;
  }
`;
