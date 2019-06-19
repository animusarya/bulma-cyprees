import React from 'react';
import styled from 'styled-components';
import Logo from '../components/elements/Logo';

const Container = styled.div`
  background-color: #25313f;
  .media {
    padding: 4px 10px;
    margin-bottom: 0%!important;
  }
  .description {
    padding: 9px 13px;
  }
`;

const Footer = () => (
  <Container>
    <div className="columns">
      <div className="column">
        <Logo />
      </div>
      <div className="column">
        <p className="description is-pulled-right is-size-7 has-text-white">
          (c) 2019 Copyright All Right Reserved
        </p>
      </div>
    </div>
  </Container>
);

export default Footer;
