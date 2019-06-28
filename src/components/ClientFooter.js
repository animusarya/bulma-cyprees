import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MainColumn from './MainColumn';
import { Title } from './elements';

const Container = styled.div`
  footer {
    padding: 1.5rem 1.5rem 1.5rem;
  }
  .disclaimer {
    background-color: ${props => props.theme.secondaryColor};
    height: 15rem;
  }
`;

const ClientFooter = () => (
  <Container>
    <MainColumn marginleft="8%" marginRight="8%" paddingless>
      <footer className="footer">
        <div className="content has-text-centered">
          <Title>Your Agent Details</Title>
          <p className="has-text-weight-semibold is-size-7">
            Paul Barrassford | 01689 123 4567 | 07939 550 774 |{' '}
            <Link to="/">paul.barrassford@colliers.com</Link>
          </p>
        </div>
      </footer>
      <div className="disclaimer has-text-weight-light is-size-7">
        <div className="column is-two-thirds is-offset-2 has-text-left has-text-white">
          <p>
            Disclaimer:Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
          </p>
          <p>
            <i className="far fa-copyright"></i> 2019 InteliShare All Rights
            Reserved
          </p>
        </div>
      </div>
    </MainColumn>
  </Container>
);

export default ClientFooter;
