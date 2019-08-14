import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  align-self: center;
  .subtitle {
    margin-bottom: 2rem !important;
    margin-top: 1.5rem !important;
  }
`;

const PaymentConfirmation = ({ project }) => (
  <Container>
    <div className="hero-body">
      <div className="has-text-centered">
        <p className="title is-size-2 has-text-weight-normal">
          Payment Successful
        </p>
        <p className="subtitle is-size-6 has-text-weight-semibold">
          Your new Project has been setup.
        </p>
        <Link to={`/admin/project/${project.id}`}>Go to your project</Link>
      </div>
    </div>
  </Container>
);

export default PaymentConfirmation;
