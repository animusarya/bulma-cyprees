import React from 'react';
import styled from 'styled-components';

import ClientReviewForm from '../components/ClientReviewForm';
import Layout from '../components/Layout';
import dummyLogo from '../assets/images/dummy-logo.jpg';

const Logo = styled.img`
  width: 150px;
  height: auto;
`;

const Description = styled.p`
  padding: 1rem 3rem 1rem 0rem;
`;

const ClientReview = () => (
  <Layout noContainer>
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div>
              <Logo src={dummyLogo} alt="dummy-logo" />
            </div>
            <Description>
              Hi, you have been invited to write a short review from DesignCity
              Ltd. Please be honest and accurate as possible about your
              experience. They will process your review which might be published
              on their website.{' '}
            </Description>
            <ClientReviewForm />
            <p>
              By submitting this review you are allowing this to be displayed on
              their company website.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ClientReview;
