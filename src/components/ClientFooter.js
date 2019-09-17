import React from 'react';
import styled from 'styled-components';

import { Title } from './elements';

const Container = styled.div`
  footer {
    padding: 1.5rem 1.5rem 1.5rem;
  }
  .disclaimer {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

const ClientFooter = ({ project }) => (
  <Container>
    <footer className="footer">
      <div className="content has-text-centered">
        <Title>{project.name}</Title>
        {/* <p className="has-text-weight-semibold is-size-7">
            Paul Barrassford | 01689 123 4567 | 07939 550 774 |{' '}
            <Link to="/">paul.barrassford@colliers.com</Link>
          </p> */}
      </div>
    </footer>
    <div className="disclaimer has-text-weight-light is-size-6">
      <div className="column has-text-white">
        {project.disclaimer && <p>Disclaimer: {project.disclaimer}</p>}
        <p>
          <i className="far fa-copyright"></i> 2019 {project.name} All Rights
          Reserved
        </p>
      </div>
    </div>
  </Container>
);

export default ClientFooter;
