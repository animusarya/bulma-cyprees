import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 12px;
  background-color: #25313f;
  .media {
    padding: 4px 10px;
  }
  .icon {
    margin: 6px 15px;
  }
  span {
    color: ${props => props.theme.primaryColor};
   }
`;

const Header = () => (
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
        <i
          className="icon fa fa-power-off is-pulled-right"
          aria-hidden="true"
        />
      </div>
    </div>
  </Container>
);

export default Header;
