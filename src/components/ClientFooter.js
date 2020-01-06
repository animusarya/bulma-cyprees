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
        <Title>Contact Details</Title>
        <p className="has-text-weight-semibold is-size-7">
          {project.contactName} |{' '}
          <a href={`tel:${project.contactTelephone}`}>
            {project.contactTelephone}
          </a>{' '}
          |{' '}
          <a href={`mailto:${project.contactEmail}`}>{project.contactEmail}</a>
        </p>
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
