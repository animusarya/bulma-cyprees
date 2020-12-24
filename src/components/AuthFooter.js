import React from 'react';
import styled from 'styled-components';

// import logo from '../assets/images/logo2.png';

const Container = styled.section`
  background-color: #f4f4f6;
  padding: 1rem 1.5rem;
  a {
    :hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;

const AuthFooter = () => (
  <Container className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-full has-text-centered">
          <p className="has-text-right">
            © {new Date().getFullYear()} Website Reviews. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </Container>
);

export default AuthFooter;
