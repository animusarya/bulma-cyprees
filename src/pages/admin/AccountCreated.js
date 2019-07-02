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
`;

const AccountCreated = () => (
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
            <p className="title">Account Created</p>
            <p className="subtitle">
              Thank you for registering, you are now signed in.
            </p>
            <Button>Create a new project</Button>
          </div>
        </div>
      </div>
    </Container>
    <CopyRight />
  </Layout>
);

export default AccountCreated;
