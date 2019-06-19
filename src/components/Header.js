import React from 'react';
import styled from 'styled-components';

import Logo from '../components/elements/Logo';


const Navbar = styled.nav`
  margin-top: 12px;
  background-color: #25313f;
 .icon {
   margin-right: 1%;
 }
 .navbar-end {
  padding-right: 1%;
 }
`;

const Header = () => (
    <Navbar className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
        <Logo />
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <i
                className="icon fa fa-power-off"
                aria-hidden="true"
              />
          </div>
        </div>
      </div>
    </Navbar>
);

export default Header;
