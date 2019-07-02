import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import Button from '../../components/elements/Button';

const Container = styled.div`
  .content {
    align-self: center;
  }
  .subtitle {
    margin-bottom: 2rem !important;
  }
`;

const PaymentConfirmation = () => (
  <Layout>
    <Seo title="Dashboard Admin" description="Page description" />
    <Header />
    <Container className="columns">
      <div className="column is-one-fifth">
        <Sidebar />
      </div>
      <div className="column content">
        <div className="hero-body">
          <div className="has-text-centered">
            <p className="title is-size-2">Payment Successful</p>
            <p className="subtitle is-size-6 has-text-weight-semibold">
              Your new Project has been setup.
            </p>
            <Button>Start your new project</Button>
          </div>
        </div>
      </div>
    </Container>
    <CopyRight />
  </Layout>
);

export default PaymentConfirmation;
