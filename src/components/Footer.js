import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #25313f;
  .media {
    padding: 4px 10px;
  }
  .description {
    padding: 9px 13px;
  }
`;

const Footer = () => (
  <Container>
    <div className="columns">
      <div className="column">
        <div className="media">
          <div className="">
            <figure className="image is-32x32">
              <img src="/images/favicon.ico" className="logo" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title has-text-weight-normal has-text-white is-size-4">
              Intelli
              <span className="has-text-weight-normal is-size-4">Share</span>
            </p>
          </div>
        </div>
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
