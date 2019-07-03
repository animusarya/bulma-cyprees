import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Title } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import ClientWelcomeEmailForm from '../../components/ClientWelcomeEmailForm';
import ClientNotificationEmailForm from '../../components/ClientNotificationEmailForm';
import AdminHeader from '../../components/AdminHeader';

const Container = styled.div``;
const ManageEmail = () => (
  <Layout>
    <Seo title="Dashboard Super Admin" description="Page description" />
    <Header />
    <Container className="columns">
      <div className="column is-one-fifth">
        <Sidebar />
      </div>
      <div className="column">
        <AdminHeader />
        <MainColumn paddingtop="1rem">
          <Heading>Manage Outgoing Email Content</Heading>
          <Title>Client Welcome Email (For Unregistered clients)</Title>
          <div>
            <ClientWelcomeEmailForm />
          </div>
          <div>
            <Title>Client Notification Email</Title>
            <ClientNotificationEmailForm />
          </div>
        </MainColumn>
      </div>
    </Container>
    <CopyRight />
  </Layout>
);

export default ManageEmail;
