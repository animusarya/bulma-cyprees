import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import paymentImg from '../assets/images/success.png';

const Container = styled.div`
  align-self: center;
  .subtitle {
    margin-bottom: 2rem !important;
    margin-top: 1.5rem !important;
  }
  .image img {
    width: 38% !important;
  }
  figure {
    justify-content: center;
  }
`;

const LinkStyled = styled(Link)`
  :hover {
    background-color: ${props => props.theme.primaryColor};
  }
`;

const PaymentConfirmation = ({ project }) => (
  <Container>
    <div className="hero-body">
      <div className="has-text-centered">
        <figure className="image is-flex">
          <img src={paymentImg} alt="Payment Successful" />
        </figure>
        <p className="title is-size-2 has-text-weight-normal">
          Payment Successful
        </p>
        <p className="subtitle is-size-6 has-text-weight-semibold">
          Your new Project has been setup.
        </p>
        <LinkStyled
          className="button is-primary is-large"
          to={`/admin/project/${project.id}/pages`}>
          Go to your project
        </LinkStyled>
      </div>
    </div>
  </Container>
);

export default PaymentConfirmation;
