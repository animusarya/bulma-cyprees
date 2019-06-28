import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo.png';

const Container = styled.div`
  .columns {
    margin: 0% 6%;
  }
  .navbar-brand {
    margin-left: 11rem;
  }
  .navbar-end {
    margin-right: 6rem;
  }
`;
const Logo = styled.img`
  width: 140px;
  height: auto;
`;

const ClientHeader = () => (
  <Container>
    <div className="columns">
      <div className="column is-horizontal">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <Logo src={logo} alt="logo" />
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div>
              <a className="button is-text">Welcome Jonathan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default ClientHeader;
