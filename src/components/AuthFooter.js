import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo2.png';

const Container = styled.section`
  background-color: #0a253e;
  a {
    :hover {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const Logo = styled.img`
  max-height: 60px;
  width: 50%;
  height: auto;
`;

const AuthFooter = ({ activeProject }) => (
  <Container className="section">
    <div className="container">
      <div className="columns">
        <div className="column">
          <p className="has-text-white">
            © 2020 IntelliShare. All Rights Reserved.
          </p>
          <div>
            <a href="#">Privacy Policy</a>{' '}
            <span className="has-text-white">|</span>{' '}
            <a href="#">Terms and Conditions</a>
          </div>
        </div>
        <div className="column has-text-right">
          {activeProject.logo ? (
            <Logo src={activeProject.logo} alt={activeProject.name} />
          ) : (
            <Logo src={logo} alt="Intellishare" />
          )}
        </div>
      </div>
    </div>
  </Container>
);

export default AuthFooter;
