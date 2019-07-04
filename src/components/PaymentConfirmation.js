import React from 'react';
import styled from 'styled-components';

import Button from './elements/Button';

const Container = styled.div`
  align-self: center;
  .subtitle {
    margin-bottom: 2rem !important;
  }
`;

const PaymentConfirmation = () => (
  <Container>
    <div className="hero-body">
      <div className="has-text-centered">
        <p className="title is-size-2 has-text-weight-normal">
          Payment Successful
        </p>
        <p className="subtitle is-size-6 has-text-weight-semibold">
          Your new Project has been setup.
        </p>
        <Button>Start your new project</Button>
      </div>
    </div>
  </Container>
);

export default PaymentConfirmation;
