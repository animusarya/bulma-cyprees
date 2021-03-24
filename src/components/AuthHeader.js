import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';

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
      <Link className="navbar-item" to="/">
        <Logo src={logo} alt="Rd_glazing logo" />
      </Link>
    </div>
  </Container>
);

export default AuthHeader;
