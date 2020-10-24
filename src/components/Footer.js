import React from 'react';
import styled from 'styled-components';

import logoAlt from '../assets/images/logo.svg';

const Container = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  margin-top: -2rem;
  .section {
    padding: 1rem 1.5rem 0.7rem 1.5rem;
  }
`;
const Logo = styled.img`
  width: 140px;
  height: auto;
`;

const Footer = () => (
  <Container>
    <section className="section">
      <div className="columns">
        <div className="column">
          <Logo src={logoAlt} alt="logo" />
        </div>
        <div className="column">
          <p className="has-text-right is-size-7 has-text-white">
            {new Date().getFullYear()} Intellishare. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  </Container>
);

export default Footer;
