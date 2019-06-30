import React from 'react';
import styled from 'styled-components';

import logoAlt from '../assets/images/logo-alt.png';

const Container = styled.div`
  background-color: ${props => props.theme.secondaryColor};
  .navbar {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

const Logo = styled.img`
  width: 140px;
  height: auto;
`;

const Button = styled.a`
  background-color: transparent;
  border: transparent;
  color: #fff;
  :hover {
    color: #fff;
  }
`;

const Header = () => (
  <Container>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <Logo src={logoAlt} alt="logo" />
        </a>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Button className="button is-text-white">
                <i className="fas fa-power-off"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </Container>
);

export default Header;
