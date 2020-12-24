import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo-ros.svg';

const Container = styled.nav`
  background-color: ${(props) => props.theme.primaryColor};
  padding: 0rem 1.5rem;
  .navbar-item {
    background-color: transparent !important;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-left: -8px;
`;

const AuthHeader = () => (
  <Container className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" to="/">
        <Logo src={logo} alt="Review our services logo" />
      </a>
    </div>
  </Container>
);

export default AuthHeader;
